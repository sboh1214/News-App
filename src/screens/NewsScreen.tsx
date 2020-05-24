import React, {useState} from 'react';
import * as NB from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/params';
import {StyleSheet, Share} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ReadingView from 'components/ReadingView';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default function NewsScreen() {
  const navigation = useNavigation();
  const route = useRoute<NewsScreenRouteProp>();

  const [viewMode, setViewMode] = useState<number>(0);

  const onShare = () => {
    Share.share({url: route.params.news.link}).catch(() => {
      NB.Toast.show({
        text: 'Error : Unable to share news',
        type: 'danger',
      });
    });
  };

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
        {viewMode === 0 ? (
          <WebView
            originWhitelist={['*']}
            source={{uri: route.params.news.link}}
          />
        ) : (
          <ReadingView news={route.params.news} />
        )}
      </NB.Content>
      <NB.Footer>
        <NB.FooterTab style={{flex: 1}}>
          {viewMode === 0 ? (
            <NB.View style={{flexDirection: 'row'}}>
              <NB.Button transparent>
                <NB.Icon name="arrow-back" type="MaterialIcons" />
              </NB.Button>
              <NB.Button transparent>
                <NB.Icon name="arrow-forward" type="MaterialIcons" />
              </NB.Button>
            </NB.View>
          ) : (
            <NB.View>
              <NB.Button transparent>
                <NB.Icon name="arrow-back" />
              </NB.Button>
            </NB.View>
          )}
        </NB.FooterTab>
        <NB.FooterTab style={{flex: 1}}>
          <SegmentedControl
            style={{height: 48, flex: 1}}
            values={['Web', 'Read']}
            selectedIndex={viewMode}
            onChange={(event) => {
              setViewMode(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </NB.FooterTab>
        <NB.FooterTab style={{flex: 1}}>
          <NB.Button transparent onPress={onShare}>
            <NB.Icon name="share" />
          </NB.Button>
        </NB.FooterTab>
      </NB.Footer>
    </NB.Container>
  );
}
