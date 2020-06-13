import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';
import auth from '@react-native-firebase/auth';
import withRoot from 'components/withRoot';
import {fetchAllRssList} from 'utils/fetch';

const AddNewsScreen = (): JSX.Element => {
  const navigation = useNavigation();

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
    <NB.Container>
      <NB.Header>
        <NB.Left>
          <NB.Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <NB.Icon name="arrow-back" />
          </NB.Button>
        </NB.Left>
        <NB.Body>
          <NB.Title testID="title">Add News</NB.Title>
        </NB.Body>
        <NB.Right />
      </NB.Header>
      <NB.Content
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getAll} />
        }>
        <NB.List>
          {rssList?.map((item) => {
            return (
              <NB.ListItem
                key={item.id}
                onPress={() => {
                  onPress(item.pressId, item.rssId, item.rssUrl);
                  // navigation.goBack();
                }}>
                <NB.Text>
                  {item.pressName} {item.rssId}
                </NB.Text>
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(AddNewsScreen);
