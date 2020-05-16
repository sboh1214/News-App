import {RouteProp} from '@react-navigation/native';

export type StackParamList = {
  TabScreen: undefined;
  SearchListScreen: {text: string} | undefined;
  AddNewsScreen: undefined;
  NewsScreen: {link: string};
};

export type NewsScreenRouteProp = RouteProp<StackParamList, 'NewsScreen'>;
export type SearchListScreenRouteProp = RouteProp<
  StackParamList,
  'SearchListScreen'
>;
