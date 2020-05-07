import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import SearchBox from 'components/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatRelative} from 'date-fns';

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<String>('');
  const [histories, setHistories] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('searchHistories')
      .orderBy('date', 'desc')
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setHistories(snapshot.docs);
        }
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  });

  const onEnter = () => {
    navigation.navigate('Search List', {text: searchText});
  };

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Search News</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content>
        <SearchBox
          onEnter={onEnter}
          onChangeText={(text: String) => {
            setSearchText(text);
          }}
        />
        <NB.Text>Search History</NB.Text>
        <NB.List>
          {histories?.map((item, index) => {
            return (
              <NB.ListItem key={index} style={styles.listItem}>
                <NB.Text>{item.data().query}</NB.Text>
                <NB.Text>
                  {formatRelative(item.data().date.toDate(), new Date())}
                </NB.Text>
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
