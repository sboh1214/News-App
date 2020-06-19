import React, {createElement} from 'react';
import {StyleSheet, Text} from 'react-native';

type RichTextBoxProps = {
  richText: string;
  textColor: string;
};

export default function RichTextBox({richText, textColor}: RichTextBoxProps) {
  const styles = StyleSheet.create({
    basic: {
      color: textColor,
    },
    bold: {
      fontWeight: 'bold',
      color: textColor,
    },
    italic: {
      fontStyle: 'italic',
    },
  });

  let text = richText;
  const children: React.ReactNode[] = [];
  while (text.length !== 0) {
    if (text.indexOf('<b>') !== -1) {
      const start = text.indexOf('<b>');
      const end = text.indexOf('</b>');
      if (start !== 0) {
        children.push(
          createElement(Text, {style: styles.basic}, text.slice(0, start)),
        );
      }
      children.push(
        React.createElement(
          Text,
          {style: styles.bold},
          text.slice(start + 3, end),
        ),
      );
      text = text.substr(end + 4);
    } else {
      children.push(createElement(Text, {}, text));
      break;
    }
  }
  const parent = createElement(Text, {testID: 'parent'}, children);
  return parent;
}
