import React from 'react';
import * as NB from 'native-base';
import {useNavigation} from '@react-navigation/native';
import press from 'utils/press';

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
        <NB.List>
          {press?.map((pressItem) => {
            return pressItem.categories.map((categoryItem) => {
              return (
                <NB.ListItem key={categoryItem.rss}>
                  <NB.Text>{`${pressItem.name} ${categoryItem.name}`}</NB.Text>
                </NB.ListItem>
              );
            });
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
