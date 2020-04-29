import React from 'react';
import * as NB from 'native-base';
import DeviceInfo from 'react-native-device-info';
import AccountBox from 'components/AccountBox';

export default function SettingsScreen() {
  return (
    <NB.Root>
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
                Version : {DeviceInfo.getVersion()}(
                {DeviceInfo.getBuildNumber()})
              </NB.Text>
            </NB.ListItem>
          </NB.List>
        </NB.Content>
      </NB.Container>
    </NB.Root>
  );
}
