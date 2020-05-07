import React from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function AddNewsScreen() {
  const navigation = useNavigation();
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
      <NB.Content>
        <NB.Text>Preparing</NB.Text>
      </NB.Content>
    </NB.Container>
  );
}
