import React from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function FeedScreen() {
  const navigation = useNavigation();

  const onAddClick = () => {
    navigation.navigate('Add News');
  };

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Feed</NB.Title>
        </NB.Body>
        <NB.Right>
          <NB.Button transparent onPress={onAddClick}>
            <NB.Icon name="add" />
          </NB.Button>
        </NB.Right>
      </NB.Header>
      <NB.Content>
        <NB.Text>Feed</NB.Text>
      </NB.Content>
    </NB.Container>
  );
}
