import React from 'react';
import {render} from '@testing-library/react-native';
import RichTextBox from 'components/RichTextBox';

jest.useFakeTimers();

test('Plain Text', async () => {
  const richText = 'Test';
  const {getByTestId} = render(
    <RichTextBox richText={richText} textColor="rgb(0,0,0,0)" />,
  );
  expect(getByTestId('container').props.children[0].props.children).toContain(
    'Test',
  );
});

test('Bold Text', async () => {
  const richText = '<b>Test</b>';
  const {getByTestId} = render(
    <RichTextBox richText={richText} textColor="rgb(0,0,0,0)" />,
  );
  expect(getByTestId('container').props.children[0].props.children).toContain(
    'Test',
  );
});

test('Mixed Text', async () => {
  const richText = 'ABC<b>DEF</b>GHI';
  const {getByTestId} = render(
    <RichTextBox richText={richText} textColor="rgb(0,0,0,0)" />,
  );
  expect(getByTestId('container').props.children[0].props.children).toContain(
    'ABC',
  );
  expect(getByTestId('container').props.children[1].props.children).toContain(
    'DEF',
  );
  expect(getByTestId('container').props.children[2].props.children).toContain(
    'GHI',
  );
});
