import React from 'react';
import {render} from '@testing-library/react-native';
import FollowingScreen from 'screens/tabs/FollowingScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
}));

test('FollowingScreen', async () => {
  const {getByTestId} = render(<FollowingScreen />);
});
