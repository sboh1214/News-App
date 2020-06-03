import React from 'react';
import * as NB from 'native-base';

export default function withRoot(WrappedComponent) {
  return (props) => {
    return (
      <NB.Root>
        <WrappedComponent {...props} />
      </NB.Root>
    );
  };
}
