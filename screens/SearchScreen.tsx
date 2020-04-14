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
  Item,
  Input,
  Icon,
} from 'native-base';

export default function SearchScreen() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Search News</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Item rounded>
          <Icon active name="search" />
          <Input placeholder="Rounded Textbox" />
        </Item>
        <Text>Search History</Text>
        <List>
          <ListItem>
            <Text>Simon Mignolet</Text>
          </ListItem>
          <ListItem>
            <Text>Nathaniel Clyne</Text>
          </ListItem>
          <ListItem>
            <Text>Dejan Lovren</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
