import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl, ScrollView, FlatList, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {fetchAllRssList} from 'utils/firebase';
import {useAppTheme, useContentStyles} from 'utils/theme';
import withRoot from 'components/withRoot';

const AddNewsScreen = (): JSX.Element => {
  const appTheme = useAppTheme();
  const contentStyles = useContentStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rssList, setRssList] = useState<Array<any>>([]);

  const getAll = () => {
    fetchAllRssList()
      .then((list) => {
        setRssList(list);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        NB.Toast.show({
          text: 'Error : Unable to get news RSS List',
          type: 'danger',
        });
      });
  };

  const onPress = async (pressId: string, rssId: string, rssUrl: string) => {
    try {
      const query = await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('rssList')
        .where('pressId', '==', pressId)
        .where('rssId', '==', rssId)
        .get();
      if (!query.empty) {
        NB.Toast.show({
          text: 'Warning : You already add this rss',
          type: 'warning',
        });
        return;
      }
      await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('rssList')
        .add({pressId, rssId, rssUrl});
      NB.Toast.show({
        text: 'Success : add rss',
        type: 'success',
      });
    } catch (error) {
      NB.Toast.show({
        text: 'Error : Cannot connect to server',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <ScrollView
      style={contentStyles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={getAll} />
      }>
      <FlatList
        data={rssList}
        renderItem={({item}) => {
          return (
            <NB.ListItem
              key={item.id}
              onPress={() => {
                onPress(item.pressId, item.rssId, item.rssUrl);
                // navigation.goBack();
              }}>
              <Text style={{color: appTheme.text}}>
                {item.pressName} {item.rssId}
              </Text>
            </NB.ListItem>
          );
        }}
      />
    </ScrollView>
  );
};

export default withRoot(AddNewsScreen);
