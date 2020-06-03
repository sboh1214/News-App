import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {RefreshControl} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SearchListScreenRouteProp} from 'utils/params';
import {searchListStyles, headerStyles} from 'utils/styles';
import withRoot from 'components/withRoot';
import NewsCard, {NewsCardStyles} from 'components/NewsCard';

const SearchListScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<SearchListScreenRouteProp>();
  const [searchString, setSearchString] = useState<string>(
    route.params?.text ?? '',
  );
  const [resultList, setResultList] = useState<Array<News>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchNews = (string: string) => {
    setIsLoading(true);
    analytics().logEvent('search', {
      query: string,
    });
    if (route.params?.id) {
      firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('searchHistories')
        .doc(route.params?.id)
        .update({
          query: string,
          date: firestore.Timestamp.now(),
        })
        .catch(() => {
          NB.Toast.show({
            text: 'Error : Unable to update search history',
            type: 'danger',
          });
        });
    } else {
      firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('searchHistories')
        .add({
          query: string,
          date: firestore.Timestamp.now(),
        })
        .catch(() => {
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
      <NB.Header style={searchListStyles.header}>
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
                    navigation.navigate('NewsScreen', {news: item});
                  }}
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
