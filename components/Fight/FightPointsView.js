import React, { Component } from 'react';
import { Container, Content, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FightHeader from './FightHeader';
import * as requestType from '../../containers/Fight/requestTypes';
import PlayerPointsView from './FightPointsViewComponents/PlayerPointsView'

class FightPointView extends Component {
  constructor() {
    super();

    this.sendPoints = this.sendPoints.bind(this);
  }


  componentDidUpdate() {
    const {message} = this.props;
    let match = true;
    switch (message.requestType) {
      case requestType.AcceptPoints:
        alert("Points accepteed");
        break;

      case requestType.StartRound:
        this.props.setRound(message.data)

        break;

      case requestType.EndRound:
        this.props.setRound(message.data);
        break;
      case requestType.ShowPrematureEndPanel:
        this.props.showPanels();
        break;

      case requestType.EndFight:
        this.props.logout();
        break;
      case requestType.SendTime:
        this.props.setRoundEndTime(message.data)
        break;
      case requestType.ResumeRound:
      case requestType.PauseRound:
        this.props.togglePause();
          break;

      default:
        match = false;
        break;
    }
    if (match) {
      this.props.clearMessage();
    }
  }

  sendPoints(points) {
    this.props.sendMessage(points);
  }
  render() {
    const {fight, user, fightStarted} = this.props;
    const redFighterName = fight.redAthlete.firstName + " " + fight.redAthlete.surname;
    const blueFighterName = fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
    return (

      <Container>
        <Content style={ { marginTop: 25 } }>
          <FightHeader user={ user } fight={ fight } started={ fightStarted } paused={this.props.pauseRound}/>
          <Grid>
            <PlayerPointsView primaryBackgroundColor='#cd2626' secondaryBackgroundColor='#720000' playerName={ redFighterName } sendPoints={ this.sendPoints } fighterId={ fight.redAthlete.id }
              judgeId={ user.id } roundId={ this.props.roundId } fightId={ fight.id } />
            <PlayerPointsView primaryBackgroundColor='#1874cd' secondaryBackgroundColor='#000080' playerName={ blueFighterName } sendPoints={ this.sendPoints } fighterId={ fight.blueAthlete.id }
              judgeId={ user.id } roundId={ this.props.roundId } fightId={ fight.id } />
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightPointView;