import React from 'react';
import * as NB from 'native-base';

export default function SearchBox() {
  return (
    <NB.Item rounded>
      <NB.Icon active name="search" />
      <NB.Input placeholder="Rounded Textbox" />
      <NB.Button transparent>
        <NB.Icon name="enter" />
      </NB.Button>
    </NB.Item>
  );
}
