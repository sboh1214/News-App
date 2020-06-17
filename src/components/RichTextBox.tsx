import React, { createElement } from 'react';
import {StyleSheet} from 'react-native';
import * as NB from 'native-base';

type RichTextBoxProps = {
  richText: string;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default function RichTextBox({richText}: RichTextBoxProps) {
  let text = richText;
  const children: React.ReactNode[] = [];
  while (text.length !== 0) {
    if (text.indexOf('<b>') !== -1) {
      const start = text.indexOf('<b>');
      const end = text.indexOf('</b>');
      if (start !== 0) {
        children.push(createElement(NB.Text, {}, text.slice(0, start)));
      }
      children.push(
        React.createElement(
          NB.Text,
          {style: styles.bold},
          text.slice(start + 3, end),
        ),
      );
      text = text.substr(end + 4);
    } else {
      children.push(createElement(NB.Text, {}, text));
      break;
    }
  }
  const parent = createElement(NB.Text, {testID: 'parent'}, children);
  return parent;
}
