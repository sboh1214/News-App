import {RouteProp} from '@react-navigation/native';
import {News} from 'utils/NaverNews';

export type StackParamList = {
  TabScreen: undefined;
  SearchListScreen: {text: string; id: string | undefined} | undefined;
  AddNewsScreen: undefined;
  NewsScreen: {news: News};
};

export type NewsScreenRouteProp = RouteProp<StackParamList, 'NewsScreen'>;
export type SearchListScreenRouteProp = RouteProp<
  StackParamList,
  'SearchListScreen'
>;
