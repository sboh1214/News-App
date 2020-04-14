import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';

export default function FeedScreen() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Feed</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>Feed</Text>
      </Content>
    </Container>
  );
}
