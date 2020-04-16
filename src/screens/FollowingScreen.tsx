import React from 'react';
import * as NB from 'native-base';

export default function FollowingScreen() {
  return (
    <NB.Container>
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
