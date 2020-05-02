import React, {useState} from 'react';
import * as NB from 'native-base';
import {Bar} from 'react-native-progress';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';
import {StyleSheet} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  const [searchString, setSearchString] = useState<String>(text);
  const [resultList, setResultList] = useState<Array<News>>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

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
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
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
      <NB.Content>
        <SearchBox
          onEnter={searchNews}
          onChangeText={(searchText: String) => {
            setSearchString(searchText);
          }}
        />
        {isLoading === true && <Bar indeterminate style={styles.loadingBar} />}
        <NB.List>
          {resultList?.map((item, index) => {
            return (
              <NB.ListItem key={index} noBorder style={styles.listItem}>
                <NB.Card key={index} style={styles.card}>
                  <NB.CardItem>
                    <NB.Text>{item.title}</NB.Text>
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
