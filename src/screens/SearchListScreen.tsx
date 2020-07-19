import React, {useState, useEffect, useLayoutEffect} from 'react';
import * as NB from 'native-base';
import {searchNewsByNaver, NaverNews} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {RefreshControl, ScrollView, View, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SearchListScreenRouteProp, SCREEN} from 'utils/navigation';
import NewsCard from 'components/NewsCard';
import {useContentStyles, useNewsCardStyles, useAppTheme} from 'utils/theme';
import {
  sendAnalyticsSearch,
  addUserSearchHistories,
  updateUserSearchHistories,
} from 'utils/firebase';
import withRoot from 'components/withRoot';

const SearchListScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<SearchListScreenRouteProp>();
  const contentStyles = useContentStyles();
  const newsCardStyles = useNewsCardStyles();
  const colors = useAppTheme();

  const setHeaderOptions = () => {
    navigation?.setOptions({
      headerTitle: () => (
        <SearchBox
          style={{iconColor: colors.text, textColor: colors.text}}
          initialText={searchString}
          onEnter={(newString: string) => {
            setSearchString(newString);
          }}
        />
      ),
      headerRight: () => {},
    });
  };
  useLayoutEffect(() => {
    navigation.addListener('focus', setHeaderOptions);
  }, [navigation]);

  const [searchString, setSearchString] = useState<string>(
    route.params?.text ?? '',
  );
  const [resultList, setResultList] = useState<Array<NaverNews>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchNews = (string: string) => {
    setIsLoading(true);
    sendAnalyticsSearch(string);
    if (route.params?.id) {
      updateUserSearchHistories(route.params?.id).catch(() => {
        NB.Toast.show({
          text: 'Error : Unable to update search history',
          type: 'danger',
        });
      });
    } else {
      addUserSearchHistories(string).catch(() => {
        NB.Toast.show({
          text: 'Error : Unable to save search history',
          type: 'danger',
        });
      });
    }
    searchNewsByNaver(string ?? '')
      .then((result) => {
        setResultList(result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchNews(searchString);
  }, [searchString]);

  return (
    <ScrollView
      style={contentStyles.content}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            searchNews(searchString);
          }}
        />
      }>
      <FlatList
        data={resultList}
        renderItem={({item}) => {
          return (
            <View key={item.link}>
              <NewsCard
                type="Small"
                title={item.title}
                onPress={() => {
                  navigation.navigate(SCREEN.News, {
                    title: item.title,
                    link: item.link,
                  });
                }}
                style={newsCardStyles.newsCard}
              />
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default withRoot(SearchListScreen);
