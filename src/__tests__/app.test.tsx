import React from 'react';
import {render} from 'react-native-testing-library';
import App from 'App';

jest.useFakeTimers();

test('App', async () => {
  render(<App />);
});
