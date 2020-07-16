import React, {useState, useEffect, useLayoutEffect} from 'react';
import * as NB from 'native-base';
import SearchBox from 'components/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl, View, Text, Button} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatRelative} from 'date-fns';
import {SwipeListView} from 'react-native-swipe-list-view';
import {searchStyles} from 'utils/styles';
import {useAppTheme, useContentStyles, useIsDark} from 'utils/theme';
import {fetchUserSearchHistories} from 'utils/firebase';
import {SCREEN} from 'utils/navigation';
import withRoot from 'components/withRoot';

const SearchScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const isDark = useIsDark();
  const setHeaderOptions = () => {
    navigation?.dangerouslyGetParent()?.setOptions({
      headerTitle: () => <SearchBox initialText="" onEnter={onEnter} />,
      headerRight: () => {},
    });
  };
  useLayoutEffect(() => {
    navigation.addListener('focus', setHeaderOptions);
  }, [navigation, isDark]);

  const appTheme = useAppTheme();
  const contentStyles = useContentStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [histories, setHistories] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const onEnter = (searchText: string) => {
    navigation.navigate(SCREEN.SearchList, {text: searchText});
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
    <SwipeListView
      style={contentStyles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onGetAll} />
      }
      data={histories}
      ListHeaderComponent={() => {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: appTheme.text}}>Search History</Text>
            <Button title="Delete All" onPress={onDeleteAll} />
          </View>
        );
      }}
      renderItem={(data) => (
        <NB.ListItem
          style={{
            ...searchStyles.listItem,
            backgroundColor: appTheme.background,
          }}
          onPress={() => {
            navigation.navigate(SCREEN.SearchList, {
              text: data.item.data().query,
              id: data.item.id,
            });
          }}>
          <Text style={{color: appTheme.text}}>{data.item.data().query}</Text>
          <Text style={{color: appTheme.text}}>
            {formatRelative(data.item.data().date.toDate(), new Date())}
          </Text>
        </NB.ListItem>
      )}
      renderHiddenItem={(data) => (
        <View>
          <Button
            title="Delete"
            onPress={() => {
              onDelete(data.item.id);
            }}
          />
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

export default withRoot(SearchScreen);
