import React from 'react';
import * as NB from 'native-base';
import {StyleSheet} from 'react-native';

type SearchBoxProps = {
  onEnter: any;
  onChangeText: any;
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
});

export default function SearchBox({onEnter, onChangeText}: SearchBoxProps) {
  return (
    <NB.Item rounded style={styles.container}>
      <NB.Icon active name="search" />
      <NB.Input
        placeholder="Rounded Textbox"
        onSubmitEditing={onEnter}
        onChangeText={onChangeText}
      />
      <NB.Button
        transparent
        onPress={() => {
          onEnter();
        }}>
        <NB.Icon type="AntDesign" name="enter" />
      </NB.Button>
    </NB.Item>
  );
}
