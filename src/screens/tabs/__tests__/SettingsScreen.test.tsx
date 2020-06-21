import React from 'react';
import {render} from '@testing-library/react-native';
import SettingsScreen from 'screens/tabs/SettingsScreen';

jest.useFakeTimers();

test('SettingsScreen', async () => {
  const {getByText} = render(<SettingsScreen />);
  expect(getByText('Account & Settings')).toBeTruthy();
});
