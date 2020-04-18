import React, {useState, useEffect} from 'react';
import Realm from 'realm';
import * as NB from 'native-base';
import SearchBox from 'components/SearchBox';
import {useNavigation} from '@react-navigation/native';
import {SearchHistorySchema, SearchHistory} from 'utils/realm';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<String>('');
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    Realm.open({
      schema: [SearchHistorySchema],
    }).then((result: any) => {
      setRealm(result);
    });
    return () => {};
  }, [realm]);

  return (
    <NB.Container>
      <NB.Content>
        <SearchBox
          onEnter={() => {
            realm?.write(() => {
              realm.create('Search History', {
                query: searchText,
                date: new Date(),
              });
            });
            navigation.navigate('Search List', {text: searchText});
          }}
          onChangeText={(text: String) => {
            setSearchText(text);
          }}
        />
        <NB.Text>Search History</NB.Text>
        <NB.List>
          {realm
            ?.objects<SearchHistory>('Search History')
            .map((item, index) => {
              return (
                <NB.ListItem
                  key={index}
                  style={{justifyContent: 'space-between'}}>
                  <NB.Text>{item.query}</NB.Text>
                  <NB.Text>{item.date.toString().slice(10)}</NB.Text>
                </NB.ListItem>
              );
            })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
