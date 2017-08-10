import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
class FightListView extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
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
}

export default FightListView;