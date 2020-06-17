import React from 'react';
import {render} from '@testing-library/react-native';
import RichTextBox from 'components/RichTextBox';

jest.useFakeTimers();

test('Plain Text', async () => {
  const richText = 'Test';
  render(<RichTextBox richText={richText} />);
});

test('Bold Text', async () => {
  const richText = '<b>Test</b>';
  render(<RichTextBox richText={richText} />);
});

test('Mixed Text', async () => {
  const richText = 'Test<b>Test</b>Text';
  render(<RichTextBox richText={richText} />);
});
