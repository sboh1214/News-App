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
  List,
  ListItem,
} from 'native-base';

export default function FollowingScreen() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Following</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>A</Text>
          </ListItem>
          <ListItem>
            <Text>Aaron Bennet</Text>
          </ListItem>
          <ListItem>
            <Text>Ali Connors</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>B</Text>
          </ListItem>
          <ListItem>
            <Text>Bradley Horowitz</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
