import React from 'react';
import * as NB from 'native-base';

type SearchBoxProps = {
  onEnter: any;
  onChangeText: any;
};

export default function SearchBox({onEnter, onChangeText}: SearchBoxProps) {
  return (
    <NB.Item rounded style={{margin: 12}}>
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
