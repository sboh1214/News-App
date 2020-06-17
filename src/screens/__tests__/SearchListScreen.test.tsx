import React from 'react';
import {render} from '@testing-library/react-native';
import SearchListScreen from 'screens/SearchListScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
  useRoute: () => {
    return {params: {text: 'Search', id: '1234'}};
  },
}));

test('SearchListScreen', async () => {
  const {getByTestId} = render(<SearchListScreen />);
});
