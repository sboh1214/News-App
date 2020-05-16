import React from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function FollowingScreen() {
  const navigation = useNavigation();

  const onAddClick = () => {
    navigation.navigate('AddNewsScreen');
  };

  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Following</NB.Title>
        </NB.Body>
        <NB.Right>
          <NB.Button transparent onPress={onAddClick}>
            <NB.Icon name="add" />
          </NB.Button>
        </NB.Right>
      </NB.Header>
      <NB.Content>
        <NB.List>
          <NB.ListItem itemDivider>
            <NB.Text>Saved & History</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>Aaron Bennet</NB.Text>
          </NB.ListItem>
          <NB.ListItem itemDivider>
            <NB.Text>Reading List</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>Ali Connors</NB.Text>
          </NB.ListItem>
          <NB.ListItem itemDivider>
            <NB.Text>RSS Feed</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>Bradley Horowitz</NB.Text>
          </NB.ListItem>
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
