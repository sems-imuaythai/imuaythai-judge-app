import React, { Component } from 'react';
import FightHeader from './FightHeader';
import { Container, Content, Text, Title, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const initialState = {

}
class PrematureEndPanel extends Component {
  state = {  }
  render() {
    return (
      <Col>
      <Row>
        <H1 style={ { color: '#ffffff' } }>{ this.props.playerName }</H1>
      </Row>
      <Grid>
        <Col>
        <Grid>
          <Col>
          <Row>
            <Text>KO</Text>
          </Row>
          <Row>
            <Button>
              <Text>Head</Text>
            </Button>
          </Row>
          <Row>
            <Button>
              <Text>Body</Text>
            </Button>
          </Row>
          </Col>
        </Grid>
        </Col>
        <Col>
        <Grid>
          <Col>
          <Row>
            <Text>RSC</Text>
          </Row>
          </Col>
          <Row>
          </Row>
        </Grid>
        </Col>
      </Grid>
      <Button full large light style={ { margin: 5 } } disabled={ this.state.subbmited } onPress={ this.handleAccept }>
        <Text>ACCEPT</Text>
      </Button>
      </Col>
      );
  }
}

export default PrematureEndPanel;