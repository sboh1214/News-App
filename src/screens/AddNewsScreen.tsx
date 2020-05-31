import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';

export default function AddNewsScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rssList, setRssList] = useState<Array<any>>([]);

  const getAll = () => {
    const list = [];
    firestore()
      .collection('presses')
      .get()
      .then((snapshot) => {
        if (snapshot) {
          snapshot.docs.forEach((press) => {
            Object.keys(press.data().rss).forEach((key) => {
              list.push({
                pressId: press.id,
                pressName: press.data().name,
                rssId: key,
                rssUrl: press.data().rss[key],
              });
            });
          });
        }
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
          <NB.Title>Add News</NB.Title>
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
              <NB.ListItem key={item.id}>
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
}
