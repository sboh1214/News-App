import React, {useState, useEffect} from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {RefreshControl} from 'react-native';

export default function AddNewsScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rssList, setRssList] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  >();

  const getAll = () => {
    firestore()
      .collection('rss_list')
      .get()
      .then((snapshot) => {
        if (snapshot) {
          setRssList(snapshot.docs);
        }
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
              <NB.ListItem>
                <NB.Text>{item.id}</NB.Text>
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
