import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import App from 'App';

jest.useFakeTimers();

test('App', async () => {
  render(<App />);
});
