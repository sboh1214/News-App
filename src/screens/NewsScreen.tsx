import React, {useState} from 'react';
import * as NB from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {NewsScreenRouteProp} from 'utils/params';
import {Share, View, ScrollView} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ReadingView from 'components/ReadingView';
import withRoot from 'components/withRoot';
import useAppTheme, {
  useHeaderStyles,
  useContentStyles,
  useFooterStyles,
} from 'utils/theme';

const NewsScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<NewsScreenRouteProp>();

  const appTheme = useAppTheme();
  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();
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
    <NB.Container>
      <NB.Header style={headerStyles.header}>
        <NB.Left style={headerStyles.left}>
          <NB.Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <NB.Icon name="arrow-back" />
          </NB.Button>
        </NB.Left>
        <NB.Body style={headerStyles.body}>
          <NB.Title style={headerStyles.bodyText} testID="title">
            News
          </NB.Title>
        </NB.Body>
        <NB.Right />
      </NB.Header>
      <ScrollView
        style={{...contentStyles.content}}
        // contentContainerStyle={viewMode === 0 ? footerStyles.content : null}
      >
        {viewMode === 0 ? (
          <WebView originWhitelist={['*']} source={{uri: route.params.link}} />
        ) : (
          <ReadingView
            title={route.params.title}
            link={route.params.link}
            style={{textColor: appTheme.text}}
          />
        )}
      </ScrollView>
      <NB.Footer style={footerStyles.footer}>
        <NB.FooterTab style={footerStyles.footerTab}>
          {viewMode === 0 ? (
            <NB.View style={footerStyles.footerView}>
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
            <NB.View style={footerStyles.footerView}>
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
