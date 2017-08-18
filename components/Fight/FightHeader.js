import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';

class FightHeader extends Component {
  state = {  }
  render() {
    const {user, fight} = this.props;
    return (
      <Grid>
        <Col style={ { width: '80%' } }>
        <Text>Logged as:
          { user.firstName + " " + user.surname } </Text>
        <Text>Weight category:
          { fight.structure.weightAgeCategory.name }
        </Text>
        <Text>Fight duration:
          { fight.structure.round.roundsCount.toString() }
        </Text>
        <Text>Referee:
          { fight.referee.firstName + " " + fight.referee.surname }
        </Text>
        </Col>
        <Col style={ { backgroundColor: '#ff3030', justifyContent: 'center', alignItems: 'center' } }>
        <Title>
          Fight not started
        </Title>
        </Col>
      </Grid>
      );
  }
}

export default FightHeader;