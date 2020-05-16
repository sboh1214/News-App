import React, {useState} from 'react';
import * as NB from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/params';
import {StyleSheet} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default function NewsScreen() {
  const navigation = useNavigation();
  const route = useRoute<NewsScreenRouteProp>();

  const [viewMode, setViewMode] = useState<number>();

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
      <NB.Content contentContainerStyle={styles.content}>
        <WebView originWhitelist={['*']} source={{uri: route.params.link}} />
      </NB.Content>
      <NB.Footer>
        <NB.FooterTab>
          <SegmentedControl
            values={['Web', 'Read']}
            selectedIndex={viewMode}
            onChange={(event) => {
              setViewMode(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </NB.FooterTab>
      </NB.Footer>
    </NB.Container>
  );
}
