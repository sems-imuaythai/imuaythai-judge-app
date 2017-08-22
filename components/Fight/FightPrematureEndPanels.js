import React, { Component } from 'react';
import FightHeader from './FightHeader';
import { Container, Content, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PrematureEndPanel from './FightPrematureEndPanelsComponents/PrematureEndPanel';
import * as requestType from '../../containers/Fight/requestTypes';


class FightPrematureEndPanels extends Component {

  componentDidUpdate() {
    const {message} = this.props;
    switch (message.requestType) {
      case requestType.EndFight:
        this.props.logout();
        break;

      default:
        break;
    }
  }
  render() {
    const {fight, user, fightStarted} = this.props;
    const redFighterName = fight.redAthlete.firstName + " " + fight.redAthlete.surname;
    const blueFighterName = fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
    return (
      <Container>
        <Content style={ { marginTop: 25 } }>
          <FightHeader fight={ fight } user={ user } started={ fightStarted } />
          <Grid>
            <PrematureEndPanel primaryBackgroundColor='#cd2626' secondaryBackgroundColor='#720000' playerName={ redFighterName } sendMessage={ this.props.sendMessage } roundEndTime={ this.props.roundEndTime }
            fighterId={ fight.redAthlete.id } judgeId={ user.id } roundId={ this.props.roundId } fightId={ fight.id }/>
            <PrematureEndPanel primaryBackgroundColor='#1874cd' secondaryBackgroundColor='#000080' playerName={ blueFighterName } sendMessage={ this.props.sendMessage } roundEndTime={ this.props.roundEndTime }
            fighterId={ fight.blueAthlete.id } judgeId={ user.id } roundId={ this.props.roundId } fightId={ fight.id }/>
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightPrematureEndPanels;