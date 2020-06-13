import React from 'react';
import {render} from '@testing-library/react-native';
import AddNewsScreen from 'screens/AddNewsScreen';

jest.useFakeTimers();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => jest.fn(),
}));

test('AddNewsScreen', async () => {
  const {getByTestId} = render(<AddNewsScreen />);

  expect(getByTestId('title').props.children).toBe('Add News');
});
