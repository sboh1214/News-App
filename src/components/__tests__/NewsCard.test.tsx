import React from 'react';
import {render} from '@testing-library/react-native';
import NewsCard from 'components/NewsCard';

jest.useFakeTimers();

test('Small', async () => {
  render(
    <NewsCard
      type="Small"
      title="Test"
      style={{
        backgroundColor: 'rgb(0,0,0)',
        textColor: 'rgb(0,0,0)',
      }}
      onPress={() => {}}
    />,
  );
});
