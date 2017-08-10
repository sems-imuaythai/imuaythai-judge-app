import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import *as requestTypes from '../../containers/Fight/requestTypes';
class FightListView extends Component {

  handleClick() {

    const data = {

      test: 'test test'

    }

    const request = {
      requestType: requestTypes.JuryConnected,
      data: JSON.stringify(data)
    }

    let text = JSON.stringify(request);
    this.props.sendMessage(text);

  }


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
          <Button onPress={ this.handleClick.bind(this) }>
            <Text>SendTest</Text>
          </Button>
        </Content>
      </Container>
      );
  }
}

export default FightListView;