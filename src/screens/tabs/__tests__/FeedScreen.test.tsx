import React from 'react';
import {render} from '@testing-library/react-native';
import FeedScreen from 'screens/tabs/FeedScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
}));

test('FeedScreen', async () => {
  const {getByText} = render(<FeedScreen />);
  expect(getByText('Feed')).toBeTruthy();
});
