type Press = {
  id: string;
  name: string;
  url: string;
  categories: [PressCategory];
};

type PressCategory = {
  id: string;
  name: string;
  rss: string;
};

const press: [Press] = [
  {
    id: 'jungang',
    name: '중앙일보',
    url: 'https://joongang.joins.com/',
    categories: [
      {
        id: 'all',
        name: '전체기사',
        rss: 'https://rss.joins.com/joins_news_list.xml',
      },
      {
        id: 'headline',
        name: '주요기사',
        rss: 'https://rss.joins.com/joins_homenews_list.xml',
      },
    ],
  },
  {
    id: 'chosun',
    name: '조선닷컴',
    url: 'http://www.chosun.com/',
    categories: [
      {
        id: 'breaking',
        name: '속보',
        rss: 'http://www.chosun.com/site/data/rss/rss.xml',
      },
      {
        id: 'headline',
        name: '오늘의 주요뉴스',
        rss: 'http://myhome.chosun.com/rss/www_section_rss.xml',
      },
      {
        id: 'hot',
        name: '인기뉴스',
        rss: 'http://newsplus.chosun.com/hitdata/xml/newsplus/index/index.xml',
      },
      {
        id: 'politics',
        name: '정치',
        rss: 'http://www.chosun.com/site/data/rss/politics.xml',
      },
      {
        id: 'business',
        name: '조선 비즈',
        rss: 'http://biz.chosun.com/site/data/rss/rss.xml',
      },
    ],
  },
];
export default press;
