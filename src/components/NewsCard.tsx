import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import RichTextBox from 'components/RichTextBox';

type NewsCardProps = {
  key?: string;
  type: 'Large' | 'Medium' | 'Small';
  title: string;
  description?: string;
  style: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  onPress: () => void;
};

export default function NewsCard(news: NewsCardProps) {
  const cardStyles = StyleSheet.create({
    card: {
      margin: 6,
      padding: 6,
      backgroundColor: news.style.backgroundColor,
      flex: 1,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: news.style.borderColor,
    },
    cardItem: {
      backgroundColor: news.style.backgroundColor,
      flexDirection: 'column',
    },
  });

  switch (news.type) {
    case 'Small':
      return (
        <Pressable onPress={news.onPress} style={cardStyles.card}>
          <RichTextBox
            richText={news.title ?? ''}
            textColor={news.style.textColor}
          />
        </Pressable>
      );
    default:
      return <Text testID="error">Error</Text>;
  }
}
