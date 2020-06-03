import React, {useState} from 'react';
import * as NB from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/params';
import {Share} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ReadingView from 'components/ReadingView';
import {newsStyles} from 'utils/styles';
import withRoot from 'components/withRoot';

const NewsScreen = (): JSX.Element => {
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
      <NB.Content
        contentContainerStyle={viewMode === 0 ? newsStyles.content : null}>
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
        <NB.FooterTab style={newsStyles.footerTab}>
          {viewMode === 0 ? (
            <NB.View style={newsStyles.footerView}>
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
        <NB.FooterTab style={newsStyles.footerTab}>
          <SegmentedControl
            style={newsStyles.footerSegment}
            values={['Web', 'Read']}
            selectedIndex={viewMode}
            onChange={(event) => {
              setViewMode(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </NB.FooterTab>
        <NB.FooterTab style={newsStyles.footerTab}>
          {viewMode === 0 ? (
            <NB.View style={newsStyles.footerView}>
              <NB.Button transparent>
                <NB.Icon name="arrow-back" type="MaterialIcons" />
              </NB.Button>
              <NB.Button transparent onPress={onShare}>
                <NB.Icon name="share" />
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
      </NB.Footer>
    </NB.Container>
  );
};

export default withRoot(NewsScreen);
