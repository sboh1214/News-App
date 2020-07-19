import React, {useState} from 'react';
import * as NB from 'native-base';
import {StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchBoxProps = {
  initialText: string;
  onEnter: (searchText: string) => void;
  style: {
    iconColor: string;
    textColor: string;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 240,
    margin: 3,
    backgroundColor: Platform.OS === 'android' ? 'white' : 'transparent',
  },
});

export default function SearchBox({
  initialText,
  style,
  onEnter,
}: SearchBoxProps) {
  const [text, setText] = useState<string>(initialText);

  return (
    <NB.Item rounded style={styles.container}>
      <Icon
        name="search"
        color={style.iconColor}
        size={24}
        style={{marginLeft: 12}}
      />
      <NB.Input
        testID="input"
        placeholder="Search News..."
        style={{color: style.textColor}}
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
        <NB.Icon
          type="MaterialIcons"
          name="backspace"
          color={style.iconColor}
        />
      </NB.Button>
    </NB.Item>
  );
}
