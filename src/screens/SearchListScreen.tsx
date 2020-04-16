import React, {useState} from 'react';
import * as NB from 'native-base';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';

export default function FeedScreen() {
  const [searchString, setSearchString] = useState<String>();
  const [resultList, setResultList] = useState<Array<News>>();

  function searchNews() {
    searchNewsByNaver(searchString ?? '')
      .then((result) => {
        setResultList(result);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  return (
    <NB.Container>
      <NB.Content>
        <SearchBox
          onEnter={searchNews}
          onChangeText={(text: String) => {
            setSearchString(text);
          }}
        />
        <NB.List>
          {resultList?.map((item, index) => {
            return (
              <NB.ListItem key={index} noBorder style={{marginVertical: -12}}>
                <NB.Card key={index} style={{flex: 1}}>
                  <NB.CardItem>
                    <NB.Text>{item.title}</NB.Text>
                  </NB.CardItem>
                </NB.Card>
              </NB.ListItem>
            );
          })}
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
}
