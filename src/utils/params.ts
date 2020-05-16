import {RouteProp} from '@react-navigation/native';

export type StackParamList = {
  TabScreen: undefined;
  SearchListScreen: {text: string; id: string | undefined} | undefined;
  AddNewsScreen: undefined;
  NewsScreen: {link: string};
};

export type NewsScreenRouteProp = RouteProp<StackParamList, 'NewsScreen'>;
export type SearchListScreenRouteProp = RouteProp<
  StackParamList,
  'SearchListScreen'
>;
