import React from 'react';
import {render} from '@testing-library/react-native';
import NewsScreen from 'screens/NewsScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
  useRoute: () => {
    return {params: {title: 'Title', link: 'http://example.com'}};
  },
}));

test('NewsScreen', async () => {
  const {getByTestId} = render(<NewsScreen />);

  expect(getByTestId('title').props.children).toBe('News');
});
