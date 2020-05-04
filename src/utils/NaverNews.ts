import axios from 'axios';

export type News = {
  title: String;
  originallink: String;
  link: String;
  description: String;
  pubDate: String;
};

export function searchNewsByNaver(searchString: String): Promise<Array<News>> {
  return new Promise((resolve, reject) => {
    axios
      .get('https://openapi.naver.com/v1/search/news', {
        headers: {
          'X-Naver-Client-Id': 'bb0gLCc9ccMMm0gyWnc9',
          'X-Naver-Client-Secret': 'pQc36JDPwa',
        },
        params: {query: searchString, display: 100, start: 1},
      })
      .then((result) => {
        const res = result.data.items.map((element) => {
          element.title = unescape(element.title);
          return element;
        });
        resolve(res);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
