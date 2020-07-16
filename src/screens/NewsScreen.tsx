import React, {useState} from 'react';
import * as NB from 'native-base';
import {useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/navigation';
import {Share, View, ScrollView, Button} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ReadingView from 'components/ReadingView';
import {useAppTheme, useFooterStyles} from 'utils/theme';

const NewsScreen = (): JSX.Element => {
  const route = useRoute<NewsScreenRouteProp>();

  const appTheme = useAppTheme();
  const footerStyles = useFooterStyles();

  const [viewMode, setViewMode] = useState<number>(0);

  const onShare = () => {
    Share.share({url: route.params.link}).catch(() => {
      NB.Toast.show({
        text: 'Error : Unable to share news',
        type: 'danger',
      });
    });
  };

  return (
    <View style={{flex: 1}}>
      {viewMode === 0 ? (
        <WebView
          style={{flex: 1}}
          originWhitelist={['*']}
          source={{uri: route.params.link}}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <ReadingView
            title={route.params.title}
            link={route.params.link}
            style={{textColor: appTheme.text}}
          />
        </ScrollView>
      )}
      <NB.Footer
        style={{
          flex: 0,
          flexDirection: 'row',
          backgroundColor: appTheme.card,
        }}>
        <NB.FooterTab style={footerStyles.footerTab}>
          {viewMode === 0 ? (
            <View style={footerStyles.footerView}>
              <Button title="Back" onPress={() => {}} />
            </View>
          ) : (
            <View>
              <Button title="Back" onPress={() => {}} />
            </View>
          )}
        </NB.FooterTab>
        <NB.FooterTab style={footerStyles.footerTab}>
          <SegmentedControl
            style={footerStyles.footerSegment}
            values={['Web', 'Read']}
            selectedIndex={viewMode}
            onChange={(event) => {
              setViewMode(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </NB.FooterTab>
        <NB.FooterTab style={footerStyles.footerTab}>
          {viewMode === 0 ? (
            <View style={footerStyles.footerView}>
              <Button title="Back" onPress={() => {}} />
              <Button title="Share" onPress={onShare} />
            </View>
          ) : (
            <View>
              <Button title="Back" onPress={() => {}} />
            </View>
          )}
        </NB.FooterTab>
      </NB.Footer>
    </View>
  );
};

export default NewsScreen;
