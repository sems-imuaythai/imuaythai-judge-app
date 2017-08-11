import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import CenterSpinner from '../Spinner/CenterSpinner';
class FightListView extends Component {


  render() {
    return (
      <Container>
        <Header />
        <Content>
          { this.props.fetching ? <CenterSpinner/> :
            <List>
              <ListItem button onPress={ () => this.props.setFightId(id) }>
                <Text>Simon Mignolet</Text>
              </ListItem>
              <ListItem button>
                <Text>Nathaniel Clyne</Text>
              </ListItem>
              <ListItem button>
                <Text>Dejan Lovren</Text>
              </ListItem>
            </List> }
        </Content>
      </Container>
      );
  }
}

export default FightListView;