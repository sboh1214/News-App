import React from 'react';
import * as NB from 'native-base';
import SearchBox from '../components/SearchBox';

export default function SearchScreen() {
  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Search News</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content>
        <SearchBox />
        <NB.Text>Search History</NB.Text>
        <NB.List>
          <NB.ListItem>
            <NB.Text>Simon Mignolet</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>Nathaniel Clyne</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>Dejan Lovren</NB.Text>
          </NB.ListItem>
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
