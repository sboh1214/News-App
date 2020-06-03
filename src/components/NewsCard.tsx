import React from 'react';
import {StyleSheet} from 'react-native';
import * as NB from 'native-base';
import RichTextBox from 'components/RichTextBox';

type NewsCardProps = {
  key?: string;
  type: 'Large' | 'Medium' | 'Small';
  title: string;
  description?: string;
  onPress: () => void;
};

export const NewsCardStyles = StyleSheet.create({
  listItem: {
    marginVertical: -12,
  },
});

const cardStyles = StyleSheet.create({
  listItem: {
    marginVertical: -12,
  },
  card: {
    flex: 1,
  },
  cardItem: {
    flexDirection: 'column',
  },
});

export default function NewsCard(news: NewsCardProps) {
  switch (news.type) {
    case 'Small':
      return (
        <NB.Card style={cardStyles.card}>
          <NB.CardItem button onPress={news.onPress}>
            <RichTextBox richText={news.title ?? ''} />
          </NB.CardItem>
        </NB.Card>
      );
    default:
      return <NB.Text>Error</NB.Text>;
  }
}
