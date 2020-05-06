import axios from 'axios';
import {Html5Entities} from 'html-entities';

export type News = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
};

export function searchNewsByNaver(searchString: String): Promise<Array<News>> {
  return new Promise((resolve, reject) => {
    axios
      .get('https://openapi.naver.com/v1/search/news', {
        headers: {
          'X-Naver-Client-Id': 'bb0gLCc9ccMMm0gyWnc9',
          'X-Naver-Client-Secret': 'pQc36JDPwa',
        },
        params: {query: searchString, display: 20, start: 1},
      })
      .then((result) => {
        const entities = new Html5Entities();
        const res = result.data.items.map((element: News) => {
          const elementResult = element;
          elementResult.title = entities.decode(element.title);
          return element;
        });
        resolve(res);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
