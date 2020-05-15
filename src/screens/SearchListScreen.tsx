import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {Bar} from 'react-native-progress';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {StyleSheet, RefreshControl} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RichTextBox from 'components/RichTextBox';

const styles = StyleSheet.create({
  loadingBar: {
    width: '94%',
  },
  listItem: {
    marginVertical: -12,
  },
  card: {
    flex: 1,
  },
});

export default function FeedScreen({route}) {
  const [searchString, setSearchString] = useState<string>(
    route.params.text ?? '',
  );
  const [resultList, setResultList] = useState<Array<News>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function searchNews(string: string) {
    setIsLoading(true);
    analytics().logEvent('search', {
      query: string,
    });
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
    searchNewsByNaver(string ?? '')
      .then((result) => {
        setResultList(result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    searchNews(searchString);
  }, [searchString]);

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Search Result about {searchString}</NB.Title>
        </NB.Body>
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
        <SearchBox
          initialText={searchString}
          onEnter={(newString: string) => {
            setSearchString(newString);
          }}
        />
        <NB.List>
          {resultList?.map((item) => {
            return (
              <NB.ListItem key={item.link} noBorder style={styles.listItem}>
                <NB.Card key={item.link} style={styles.card}>
                  <NB.CardItem key={item.link}>
                    <RichTextBox key={item.link} richText={item.title} />
                  </NB.CardItem>
                </NB.Card>
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
