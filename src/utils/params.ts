import {RouteProp} from '@react-navigation/native';

export type News = {
  title: string;
  link: string;
  originallink?: string;
};

export type StackParamList = {
  TabScreen: undefined;
  SearchListScreen: {text: string; id: string | undefined} | undefined;
  AddNewsScreen: undefined;
  NewsScreen: News;
};

export type NewsScreenRouteProp = RouteProp<StackParamList, 'NewsScreen'>;
export type SearchListScreenRouteProp = RouteProp<
  StackParamList,
  'SearchListScreen'
>;
