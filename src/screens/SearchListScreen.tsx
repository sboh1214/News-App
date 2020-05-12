import React, {useState} from 'react';
import * as NB from 'native-base';
import {Bar} from 'react-native-progress';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {StyleSheet, RefreshControl} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RichTextBox from 'components/RichTextBox';

type FeedScreenProps = {
  text: string;
};

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

export default function FeedScreen({text}: FeedScreenProps) {
  const [searchString, setSearchString] = useState<string>(text);
  const [resultList, setResultList] = useState<Array<News>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function searchNews() {
    setIsLoading(true);
    analytics().logEvent('search', {
      query: searchString,
    });
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('searchHistories')
      .add({
        query: searchString,
        date: firestore.Timestamp.now(),
      })
      .catch(() => {
        NB.Toast.show({
          text: 'Error : Unable to save search history',
          type: 'danger',
        });
      });
    searchNewsByNaver(searchString ?? '')
      .then((result) => {
        setResultList(result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <NB.Container>
      <NB.Content
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={searchNews} />
        }>
        <SearchBox
          onEnter={searchNews}
          onChangeText={(searchText: string) => {
            setSearchString(searchText);
          }}
        />
        {isLoading === true && <Bar indeterminate style={styles.loadingBar} />}
        <NB.List>
          {resultList?.map((item, index) => {
            return (
              <NB.ListItem key={index} noBorder style={styles.listItem}>
                <NB.Card key={index} style={styles.card}>
                  <NB.CardItem key={index}>
                    <RichTextBox key={index} richText={item.title} />
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
