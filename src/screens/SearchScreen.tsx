import React, {useState} from 'react';
import * as NB from 'native-base';
import SearchBox from '../components/SearchBox';
import {useNavigation} from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<String>('');

  return (
    <NB.Container>
      <NB.Content>
        <SearchBox
          onEnter={() => {
            navigation.navigate('Search List');
          }}
          onChangeText={(text: String) => {
            setSearchText(text);
          }}
        />
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
