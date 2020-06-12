import React, {useState} from 'react';
import * as NB from 'native-base';
import {StyleSheet, Platform} from 'react-native';

type SearchBoxProps = {
  initialText: string;
  onEnter: (searchText: string) => void;
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: Platform.OS === 'android' ? 'white' : 'transparent',
  },
});

export default function SearchBox({initialText, onEnter}: SearchBoxProps) {
  const [text, setText] = useState<string>(initialText);

  return (
    <NB.Item rounded style={styles.container}>
      <NB.Icon type="MaterialIcons" name="search" />
      <NB.Input
        testID="input"
        placeholder="Search News..."
        onSubmitEditing={() => {
          onEnter(text);
        }}
        onChangeText={(newText) => {
          setText(newText);
        }}
        value={text}
      />
      <NB.Button
        transparent
        onPress={() => {
          setText('');
        }}>
        <NB.Icon type="MaterialIcons" name="backspace" />
      </NB.Button>
    </NB.Item>
  );
}
