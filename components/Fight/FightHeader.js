import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';
import { Timer } from 'react-native-stopwatch-timer';

const options = {
  container: {
    
  },
  text: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: 7,
  }
};

class FightHeader extends Component {
  
  render() {
    const {user, fight} = this.props;

    const timer = <Timer totalDuration={ (fight.structure.round.duration * 1000) } msecs start={ this.props.started } reset={ this.props.timerReset } options={ options } handleFinish={() => this.props.resetTimer() } />;
    const text = <Title>{this.props.started ? "Fight started" : "Fight not started"}</Title>;
    return (
      <Grid>
        <Col style={ { width: '75%' } }>
        <Text>Logged as:
          { user.firstName + " " + user.surname } </Text>
        <Text>Weight category:
          { fight.structure.weightAgeCategory.name }
        </Text>
        <Text>Fight duration:
          { fight.structure.round.roundsCount.toString() + " rounds" }
        </Text>
        <Text>Referee:
          { fight.referee.firstName + " " + fight.referee.surname }
        </Text>
        </Col>
        <Col style={ { backgroundColor: this.props.started ? '#18c90a' : '#ff3030', justifyContent: 'center', alignItems: 'center' } }>
          {this.props.showTimer ? timer : text}
        </Col>
      </Grid>
      );
  }
}

export default FightHeader;