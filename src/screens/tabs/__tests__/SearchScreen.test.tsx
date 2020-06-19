import React from 'react';
import {render} from '@testing-library/react-native';
import SearchScreen from 'screens/tabs/SearchScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
}));

test('SearchScreen', async () => {
  render(<SearchScreen />);
});
