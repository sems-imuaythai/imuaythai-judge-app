import React, { Component } from 'react';
import { Container, Content, Text, Title, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FightHeader from './FightHeader';
import * as requestType from '../../containers/Fight/requestTypes';


class FightTimekeeperView extends Component {
  constructor() {
    super();
    this.state = {
      roundTime: 0
    }

  }
  //TODO: send time 
  render() {
    const {user, fight} = this.props;
    return (
      <Container>
        <Content style={ { marginTop: 25 } }>
          <FightHeader user={ user } fight={ fight } roundTime={ this.state.roundTime } started={this.props.timerStart} resetTimer={this.props.resetTimer} toggleTimer={this.props.toggleTimer} timerReset={this.props.timerReset} showTimer={true}/>
          <Grid style={ { marginTop: 10 } }>
            <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Row >
              <Button light onPress={ this.props.toggleTimer } style={{width: 200, height: 200, justifyContent: 'center', borderWidth:1.0, borderColor: '#000', marginRight:1}}>
                <Text>
                  { this.props.timerStart ? 'PAUSE' : 'START' }
                </Text>
              </Button>
            </Row>
            </Col>
            <Col>
            <Row>
              <Button light style={{width: 100, height: 100, justifyContent: 'center', borderWidth:1.0, borderColor: '#000', marginLeft:1, marginBottom:1}}>
                <Text>
                  STOP
                </Text>
              </Button>
            </Row>
            <Row>
              <Button light style={{width: 100, height: 100, justifyContent: 'center', borderWidth:1.0, borderColor: '#000', marginLeft:1}}>
                <Text>
                  SIGNAL
                </Text>
              </Button>
            </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightTimekeeperView;