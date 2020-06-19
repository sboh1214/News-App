import React from 'react';
import {StyleSheet} from 'react-native';
import * as NB from 'native-base';
import RichTextBox from 'components/RichTextBox';

type NewsCardProps = {
  key?: string;
  type: 'Large' | 'Medium' | 'Small';
  title: string;
  description?: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  onPress: () => void;
};

export const NewsCardStyles = StyleSheet.create({
  listItem: {
    marginVertical: -12,
  },
});

export default function NewsCard(news: NewsCardProps) {
  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: news.style.backgroundColor,
      flex: 1,
    },
    cardItem: {
      backgroundColor: news.style.backgroundColor,
      flexDirection: 'column',
    },
  });

  switch (news.type) {
    case 'Small':
      return (
        <NB.Card style={cardStyles.card}>
          <NB.CardItem
            style={cardStyles.cardItem}
            button
            onPress={news.onPress}>
            <RichTextBox
              richText={news.title ?? ''}
              textColor={news.style.textColor}
            />
          </NB.CardItem>
        </NB.Card>
      );
    default:
      return <NB.Text testID="error">Error</NB.Text>;
  }
}
