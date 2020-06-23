import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {searchNewsByNaver, NaverNews} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {RefreshControl} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SearchListScreenRouteProp} from 'utils/params';
import withRoot from 'components/withRoot';
import NewsCard, {NewsCardStyles} from 'components/NewsCard';
import {
  useHeaderStyles,
  useContentStyles,
  useNewsCardStyles,
} from 'utils/theme';
import {
  sendAnalyticsSearch,
  addUserSearchHistories,
  updateUserSearchHistories,
} from 'utils/firebase';

const SearchListScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<SearchListScreenRouteProp>();

  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();
  const newsCardStyles = useNewsCardStyles();

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
    <NB.Container>
      <NB.Header style={headerStyles.thickHeader}>
        <NB.Left style={headerStyles.left}>
          <NB.Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <NB.Icon name="arrow-back" />
          </NB.Button>
        </NB.Left>
        <NB.Body style={headerStyles.body}>
          <SearchBox
            initialText={searchString}
            onEnter={(newString: string) => {
              setSearchString(newString);
            }}
          />
        </NB.Body>
        <NB.Right style={headerStyles.right} />
      </NB.Header>
      <NB.Content
        style={contentStyles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              searchNews(searchString);
            }}
          />
        }>
        <NB.List>
          {resultList?.map((item) => {
            return (
              <NB.ListItem
                key={item.link}
                noBorder
                style={NewsCardStyles.listItem}>
                <NewsCard
                  type="Small"
                  title={item.title}
                  onPress={() => {
                    navigation.navigate('NewsScreen', {
                      title: item.title,
                      link: item.link,
                    });
                  }}
                  style={newsCardStyles.newsCard}
                />
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(SearchListScreen);
