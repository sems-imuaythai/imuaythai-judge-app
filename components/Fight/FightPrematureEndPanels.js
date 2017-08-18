import React, { Component } from 'react';
import FightHeader from './FightHeader';
import { Container, Content, Text, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import PrematureEndPanel from './FightPrematureEndPanelsComponents/PrematureEndPanel';


class FightPrematureEndPanels extends Component {
  state = {  }
  render() {
    return (
      <Container>
        <FightHeader/>
        <Grid>
          <PrematureEndPanel />
          <PrematureEndPanel />
        </Grid>
      </Container>
      );
  }
}

export default FightPrematureEndPanels;