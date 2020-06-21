export type NaverNews = {
  title: string;
  originallink?: string;
  link: string;
  description?: string;
  pubDate?: string;
};

export async function searchNewsByNaver(
  searchString: string,
): Promise<Array<NaverNews>> {
  return new Promise((resolve) => {
    resolve([{title: searchString, link: 'example.com'}]);
  });
}
