import React from 'react';
import * as NB from 'native-base';
import DeviceInfo from 'react-native-device-info';
import AccountBox from 'components/AccountBox';
import {Linking} from 'react-native';
import withRoot from 'components/withRoot';

const SettingsScreen = (): JSX.Element => {
  return (
    <NB.Container>
      <NB.Header>
        <NB.Body>
          <NB.Title>Account & Settings</NB.Title>
        </NB.Body>
      </NB.Header>
      <NB.Content>
        <NB.List>
          <NB.ListItem itemDivider>
            <NB.Text>Account</NB.Text>
          </NB.ListItem>
          <AccountBox />
          <NB.ListItem itemDivider>
            <NB.Text>About</NB.Text>
          </NB.ListItem>
          <NB.ListItem>
            <NB.Text>
              Version : {DeviceInfo.getVersion()}({DeviceInfo.getBuildNumber()})
            </NB.Text>
          </NB.ListItem>
          <NB.ListItem
            onPress={() => {
              Linking.openURL('mailto:sboh1214@gmail.com');
            }}>
            <NB.Text>Email to developer</NB.Text>
          </NB.ListItem>
        </NB.List>
      </NB.Content>
    </NB.Container>
  );
};

export default withRoot(SettingsScreen);
