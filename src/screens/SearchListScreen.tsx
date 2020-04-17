import React, {useState} from 'react';
import * as NB from 'native-base';
import {Bar} from 'react-native-progress';
import {searchNewsByNaver, News} from 'utils/NaverNews';
import SearchBox from 'components/SearchBox';

export default function FeedScreen({text}) {
  const [searchString, setSearchString] = useState<String>(text);
  const [resultList, setResultList] = useState<Array<News>>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  function searchNews() {
    setIsLoading(true);
    searchNewsByNaver(searchString ?? '')
      .then((result) => {
        setResultList(result);
        setIsLoading(false);
      })
      .catch((reason) => {
        console.log(reason);
        setIsLoading(false);
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
        {isLoading === true && <Bar indeterminate style={{flex: 1}} />}
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
