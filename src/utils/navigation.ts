import {RouteProp} from '@react-navigation/native';

export enum SCREEN {
  Feed = 'Feed',
  Following = 'Following',
  Search = 'Search',
  Settings = 'Settings',
  AddNews = 'Add News',
  News = 'Article',
  SearchList = 'Search Result',
  Tab = 'News',
}

export type News = {
  title: string;
  link: string;
  originallink?: string;
};

export type StackParamList = {
  [SCREEN.Tab]: undefined;
  [SCREEN.SearchList]: {text: string; id: string | undefined} | undefined;
  [SCREEN.AddNews]: undefined;
  [SCREEN.News]: News;
};

export type NewsScreenRouteProp = RouteProp<StackParamList, SCREEN.News>;
export type SearchListScreenRouteProp = RouteProp<
  StackParamList,
  SCREEN.SearchList
>;
