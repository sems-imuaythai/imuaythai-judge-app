import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Title } from 'native-base';
import CenterSpinner from '../Spinner/CenterSpinner';
class FightListView extends Component {


  render() {
    const renderFightList = this.props.fights.map((fight, key) => (
      <ListItem key={ key } button onPress={ () => this.props.setFightId(fight.id) }>
        <Text>
          { fight.blueAthlete.firstName + " " + fight.blueAthlete.surname + " vs " + fight.redAthlete.firstName + " " + fight.redAthlete.surname } </Text>
      </ListItem>))
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>
              Fights list
            </Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          { this.props.fetching ? <CenterSpinner/> :
            <List>
              { renderFightList }
            </List> }
        </Content>
      </Container>
      );
  }
}

export default FightListView;