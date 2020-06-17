import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import SearchBox from 'components/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatRelative} from 'date-fns';
import {SwipeListView} from 'react-native-swipe-list-view';
import {searchStyles} from 'utils/styles';
import withRoot from 'components/withRoot';
import {useHeaderStyles, useContentStyles} from 'utils/theme';
import {fetchUserSearchHistories} from 'utils/firebase';

const SearchScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [histories, setHistories] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const onEnter = (searchText: string) => {
    navigation.navigate('SearchListScreen', {text: searchText});
  };

  const onGetAll = () => {
    setIsLoading(true);
    fetchUserSearchHistories()
      .then((docs) => {
        if (docs) {
          setHistories(docs);
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
      <NB.Header style={{...headerStyles.header, height: 84}}>
        <NB.Body>
          <SearchBox initialText="" onEnter={onEnter} />
        </NB.Body>
      </NB.Header>
      <SwipeListView
        style={contentStyles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onGetAll} />
        }
        data={histories}
        ListHeaderComponent={() => {
          return (
            <NB.View>
              <NB.Text>Search History</NB.Text>
              <NB.Button onPress={onDeleteAll}>
                <NB.Text>Delete All</NB.Text>
              </NB.Button>
            </NB.View>
          );
        }}
        renderItem={(data) => (
          <NB.ListItem
            noIndent
            style={searchStyles.listItem}
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
    </NB.Container>
  );
};

export default withRoot(SearchScreen);
