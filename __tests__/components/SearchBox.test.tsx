import React from 'react';
import {render} from '@testing-library/react-native';
import SearchBox from 'components/SearchBox';

jest.useFakeTimers();

test('SearchBox', async () => {
  const initialText = 'Test';
  const {getByTestId, getByText, queryByTestId, baseElement} = render(
    <SearchBox initialText={initialText} onEnter={() => {}} />,
  );

  expect(getByTestId('input').props.value).toBe(initialText);
});
