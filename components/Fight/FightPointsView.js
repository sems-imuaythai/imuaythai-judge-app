import React, { Component } from 'react';
import { Container, Content, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FightHeader from './FightHeader';
import * as requestType from '../../containers/Fight/requestTypes';
import PlayerPointsView from './FightPointsViewComponents/PlayerPointsView'

class FightPointView extends Component {
  constructor() {
    super();
    this.state = {
      fightStarted: false,
      roundId: ''
    }

    this.setRound = this.setRound.bind(this);
    this.sendPoints = this.sendPoints.bind(this);
  }

  setRound() {
    this.setState((prevState) => ({
      fightStarted: !prevState.fightStarted
    }))
  }

  componentDidUpdate() {
    const {message} = this.props;
    let match = true;
    switch (message.requestType) {
      case requestType.AcceptPoints:
        alert("Points accepteed");
        break;

      case requestType.StartRound:
        this.setState({
          roundId: message.data,
          fightStarted: true
        });

        break;

      case requestType.EndRound:
        this.setRound();
        break;
      case requestType.ShowPrematureEndPanel:
        //TODO premature end panel
        break;

      case requestType.EndFight:
        this.props.logout();
        break;

      default:
      match = false;
        break;
    }
    if(match){
      this.props.clearMessage();
    }
  }

  sendPoints(points) {
    this.props.sendMessage(points);
  }
  render() {
    console.log(this.state);
    const {fight, user} = this.props;
    const redFighterName = fight.redAthlete.firstName + " " + fight.redAthlete.surname;
    const blueFighterName = fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
    return (

      <Container>
        <Content style={ { marginTop: 25 } }>
          <FightHeader user={ user } fight={ fight } />
          <Grid>
            <PlayerPointsView primaryBackgroundColor='#cd2626' secondaryBackgroundColor='#720000' playerName={ redFighterName } sendPoints={ this.sendPoints } fighterId={ fight.redAthlete.id }
              judgeId={ user.id } roundId={ this.state.roundId } />
            <PlayerPointsView primaryBackgroundColor='#1874cd' secondaryBackgroundColor='#000080' playerName={ blueFighterName } sendPoints={ this.sendPoints } fighterId={ fight.blueAthlete.id }
              judgeId={ user.id } roundId={ this.state.roundId } />
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightPointView;