import React from 'react';
import * as NB from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/params';

export default function NewsScreen() {
  const navigation = useNavigation();
  const route = useRoute<NewsScreenRouteProp>();
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
          <NB.Title>News</NB.Title>
        </NB.Body>
        <NB.Right />
      </NB.Header>
      <NB.Content contentContainerStyle={{flex: 1}}>
        <WebView originWhitelist={['*']} source={{uri: route.params.link}} />
      </NB.Content>
      <NB.Footer>
        <NB.Button>
          <NB.Text>Web</NB.Text>
        </NB.Button>
        <NB.Button>
          <NB.Text>Read</NB.Text>
        </NB.Button>
      </NB.Footer>
    </NB.Container>
  );
}
