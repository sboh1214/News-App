import React from 'react';
import {StyleSheet, Text} from 'react-native';

type RichTextBoxProps = {
  richText: string;
  textColor: string;
};

export default function RichTextBox({richText, textColor}: RichTextBoxProps) {
  const styles = StyleSheet.create({
    basic: {
      color: textColor,
      textAlign: 'left',
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
  const children: Array<any> = [];
  while (text.length !== 0) {
    if (text.indexOf('<b>') !== -1) {
      const start = text.indexOf('<b>');
      const end = text.indexOf('</b>');
      if (start !== 0) {
        children.push({text: text.slice(0, start), type: 'medium'});
      }
      children.push({
        text: text.slice(start + 3, end),
        type: 'bold',
      });
      text = text.substr(end + 4);
    } else {
      children.push({text, type: 'medium'});
      break;
    }
  }

  return (
    <Text style={styles.basic}>
      {children.map((value) => {
        switch (value.type) {
          case 'medium':
            return <Text style={styles.basic}>{value.text}</Text>;
          case 'bold':
            return <Text style={styles.bold}>{value.text}</Text>;
          default:
            return <Text style={styles.basic}>{value.text}</Text>;
        }
      })}
    </Text>
  );
}
