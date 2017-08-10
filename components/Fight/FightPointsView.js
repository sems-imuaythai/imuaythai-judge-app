import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Input, H1, Title, Body, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import PlayerPointsView from './FightPointsViewComponents/PlayerPointsView'

class FightPointView extends Component {
  render() {
    return (
      <Container>
        <Content style={ { marginTop: 25 } }>
          <Grid>
            <Col style={ { width: '80%' } }>
            <Text>Logged as: Jon Snow</Text>
            <Text>Weight category: big</Text>
            <Text>Fight duration: 3 rounds</Text>
            <Text>Referee: Włodek</Text>
            </Col>
            <Col style={ { backgroundColor: '#ff3030', justifyContent: 'center', alignItems: 'center' } }>
            <Title>
              Fight not started
            </Title>
            </Col>
          </Grid>
          <Grid>
            <PlayerPointsView primaryBackgroundColor='#cd2626' secondaryBackgroundColor='#720000' playerName="Tommy Gun Wales" />
            <PlayerPointsView primaryBackgroundColor='#1874cd' secondaryBackgroundColor='#000080' playerName="Chuck Norris" />
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightPointView;