import React, {useState} from 'react';
import * as NB from 'native-base';
import {useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/navigation';
import {Share, View, ScrollView} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ReadingView from 'components/ReadingView';
import {useAppTheme, useFooterStyles} from 'utils/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type WebViewState = {
  url?: string;
  title?: string;
  loading?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
};

const NewsScreen = (): JSX.Element => {
  const route = useRoute<NewsScreenRouteProp>();
  const colors = useAppTheme();

  const appTheme = useAppTheme();
  const footerStyles = useFooterStyles();

  const [viewMode, setViewMode] = useState<number>(0);
  const [webRef, setWebRef] = useState<any>();
  const [webViewState, setWebViewState] = useState<WebViewState>();

  const handleWebView = (state: WebViewState) => {
    setWebViewState(state);
  };

  const onPressBack = () => {
    if (webViewState?.canGoBack === true) {
      webRef.goBack();
    }
  };

  const onPressForward = () => {
    if (webViewState?.canGoForward === true) {
      webRef.goForward();
    }
  };

  const onShareLink = () => {
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
          onNavigationStateChange={handleWebView}
          ref={(ref) => setWebRef(ref)}
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
              <Icon.Button
                name="arrow-back"
                backgroundColor="#00000000"
                color={colors.primary}
                onPress={onPressBack}
                size={32}
              />
              <Icon.Button
                name="arrow-forward"
                backgroundColor="#00000000"
                color={colors.primary}
                onPress={onPressForward}
                size={32}
              />
            </View>
          ) : (
            <View />
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
          <Icon.Button
            name="share"
            backgroundColor="#00000000"
            color={colors.primary}
            onPress={onShareLink}
            size={32}
          />
          <Icon.Button
            name="save"
            backgroundColor="#00000000"
            color={colors.primary}
            onPress={onShareLink}
            size={32}
          />
        </NB.FooterTab>
      </NB.Footer>
    </View>
  );
};

export default NewsScreen;
