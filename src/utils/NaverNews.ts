import {Html5Entities} from 'html-entities';
import perf from '@react-native-firebase/perf';
import auth from '@react-native-firebase/auth';

export type NaverNews = {
  title: string;
  originallink?: string;
  link: string;
  description?: string;
  pubDate?: string;
};

export async function searchNewsByNaver(
  searchString: String,
): Promise<Array<NaverNews>> {
  const url = `https://openapi.naver.com/v1/search/news?query=${searchString}&display=20`;

  const metric = await perf().newHttpMetric(url, 'GET');
  metric.putAttribute('type', 'Naver News Search');
  metric.putAttribute('user', auth().currentUser?.uid ?? 'anonymous');
  await metric.start();

  const res = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': 'bb0gLCc9ccMMm0gyWnc9',
      'X-Naver-Client-Secret': 'pQc36JDPwa',
    },
  });

  metric.setHttpResponseCode(res.status);
  metric.setResponseContentType(res.headers.get('Content-Type'));
  metric.setResponsePayloadSize(
    parseInt(res.headers.get('Content-Length') ?? '0', 10),
  );
  await metric.stop();

  const json = await res.json();
  const entities = new Html5Entities();
  const list = json.items.map((element: NaverNews) => {
    const elementResult = element;
    elementResult.title = entities.decode(element.title);
    return element;
  });
  return list;
}
