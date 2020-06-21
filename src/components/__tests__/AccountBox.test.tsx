import React from 'react';
import {render} from '@testing-library/react-native';
import AccountBox from 'components/AccountBox';

jest.useFakeTimers();

test('AccountBox', async () => {
  render(<AccountBox style={{textColor: 'rgb(0,0,0)'}} />);
});
