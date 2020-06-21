import React, {useState} from 'react';
import * as NB from 'native-base';
import AccountBox from 'components/AccountBox';
import {Linking, StyleSheet} from 'react-native';
import withRoot from 'components/withRoot';
import SegmentedControl from '@react-native-community/segmented-control';
import useAppTheme, {useHeaderStyles, useContentStyles} from 'utils/theme';
import getVersionAndBuild from 'utils/version';

const SettingsScreen = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<number>(0);

  const headerStyles = useHeaderStyles();
  const contentStyles = useContentStyles();
  const appTheme = useAppTheme();

  const {version, build} = getVersionAndBuild();

  const styles = StyleSheet.create({
    segment: {height: 48, flex: 1},
  });

  return (
    <NB.Container>
      <NB.Header style={headerStyles.header}>
        <NB.Body style={headerStyles.body}>
          <NB.Title style={headerStyles.bodyText}>Account & Settings</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content style={contentStyles.content}>
        <NB.List>
          <NB.ListItem style={{backgroundColor: appTheme.card}} itemDivider>
            <NB.Text style={{color: appTheme.text}}>Account</NB.Text>
          </NB.ListItem>
          <AccountBox style={{textColor: appTheme.text}} />
          <NB.ListItem style={{backgroundColor: appTheme.card}} itemDivider>
            <NB.Text style={{color: appTheme.text}}>Appearance</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <SegmentedControl
              style={styles.segment}
              values={['System', 'Light', 'Dark']}
              selectedIndex={themeMode}
              onChange={(event) => {
                setThemeMode(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </NB.ListItem>
          <NB.ListItem style={{backgroundColor: appTheme.card}} itemDivider>
            <NB.Text style={{color: appTheme.text}}>About</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text style={{color: appTheme.text}}>
              Version : {version}({build})
            </NB.Text>
          </NB.ListItem>
          <NB.ListItem
            onPress={() => {
              Linking.openURL('mailto:sboh1214@gmail.com');
            }}>
            <NB.Text style={{color: appTheme.text}}>Email to developer</NB.Text>
          </NB.ListItem>
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(SettingsScreen);
