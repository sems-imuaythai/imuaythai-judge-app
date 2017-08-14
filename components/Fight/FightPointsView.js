import React, { Component } from 'react';
import { Container, Content, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import PlayerPointsView from './FightPointsViewComponents/PlayerPointsView'

class FightPointView extends Component {
    render() {
        const {fight, user} = this.props;
        const redFighterName = fight.redAthlete.firstName + " " + fight.redAthlete.surname;
        const blueFighterName = fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
        return (
            <Container>
              <Content style={ { marginTop: 25 } }>
                <Grid>
                  <Col style={ { width: '80%' } }>
                  <Text>Logged as:{ user.firstName + " " + user.surname  } </Text>
                  <Text>Weight category: big</Text>
                  <Text>Fight duration: 3 rounds</Text>
                  <Text>Referee:
                    { fight.referee.firstName + " " +fight.referee.surname }
                  </Text>
                  </Col>
                  <Col style={ { backgroundColor: '#ff3030', justifyContent: 'center', alignItems: 'center' } }>
                  <Title>
                    Fight not started
                  </Title>
                  </Col>
                </Grid>
                <Grid>
                  <PlayerPointsView primaryBackgroundColor='#cd2626' secondaryBackgroundColor='#720000' playerName={ redFighterName } sendPoints={ this.props.sendPoints } fighterId={fight.redAthlete.id} judgeId={user.id}  />
                  <PlayerPointsView primaryBackgroundColor='#1874cd' secondaryBackgroundColor='#000080' playerName={ blueFighterName } sendPoints={ this.props.sendPoints } fighterId={fight.blueAthlete.id} judgeId={user.id} />
                </Grid>
              </Content>
            </Container>
            );
    }
}

export default FightPointView;