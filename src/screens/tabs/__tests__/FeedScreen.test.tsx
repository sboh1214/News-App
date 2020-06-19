import React from 'react';
import {render} from '@testing-library/react-native';
import FeedScreen from 'screens/tabs/FeedScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
}));

test('FeedScreen', async () => {
  const {getByTestId} = render(<FeedScreen />);
  expect(getByTestId('title').props.children).toBe('Feed');
});
