import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import SearchBox from 'components/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, RefreshControl} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatRelative} from 'date-fns';
import {SwipeListView} from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default function SearchScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [histories, setHistories] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const onEnter = (searchText: string) => {
    navigation.navigate('SearchListScreen', {text: searchText});
  };

  const onGetAll = () => {
    setIsLoading(true);
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('searchHistories')
      .orderBy('date', 'desc')
      .get()
      .then((snapshot) => {
        if (snapshot) {
          setHistories(snapshot.docs);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        NB.Toast.show({
          text: 'Error : Unable to get search histories',
          type: 'danger',
        });
      });
  };

  const onDelete = async (id: string) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('searchHistories')
      .doc(id)
      .delete()
      .catch(() => {
        NB.Toast.show({
          text: 'Error : Unable to delete search history',
          type: 'danger',
        });
      });
    onGetAll();
  };

  const onDeleteAll = async () => {
    const collections = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('searchHistories')
      .get();
    const requests = collections.docs.map((item) => {
      return new Promise((resolve, reject) => {
        firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .collection('searchHistories')
          .doc(item.id)
          .delete()
          .then(resolve)
          .catch(reject);
      });
    });
    Promise.all(requests)
      .then(() => {
        NB.Toast.show({
          text: 'Deleted all histories',
          type: 'success',
        });
        onGetAll();
      })
      .catch(() => {
        NB.Toast.show({
          text: 'Error : Unable to delete all histories',
          type: 'danger',
        });
        onGetAll();
      });
  };

  useEffect(() => {
    onGetAll();
  }, []);

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Search News</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onGetAll} />
        }>
        <SearchBox initialText="" onEnter={onEnter} />
        <NB.Text>Search History</NB.Text>
        <NB.Button onPress={onDeleteAll}>
          <NB.Text>Delete All</NB.Text>
        </NB.Button>
        <SwipeListView
          data={histories}
          renderItem={(data) => (
            <NB.ListItem
              noIndent
              style={styles.listItem}
              onPress={() => {
                navigation.navigate('SearchListScreen', {
                  text: data.item.data().query,
                  id: data.item.id,
                });
              }}>
              <NB.Text>{data.item.data().query}</NB.Text>
              <NB.Text>
                {formatRelative(data.item.data().date.toDate(), new Date())}
              </NB.Text>
            </NB.ListItem>
          )}
          renderHiddenItem={(data) => (
            <NB.View>
              <NB.Button
                onPress={() => {
                  onDelete(data.item.id);
                }}>
                <NB.Text>Delete</NB.Text>
              </NB.Button>
            </NB.View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </NB.Content>
    </NB.Container>
  );
}
