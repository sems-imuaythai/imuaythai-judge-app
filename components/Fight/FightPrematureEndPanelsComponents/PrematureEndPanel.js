import React, { Component } from 'react';
import { Container, Content, Text, Title, Button, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native';
import ReasonPanel from './ReasonPanel';
import * as requestTypes from '../../../containers/Fight/requestTypes';

class PrematureEndPanel extends Component {
  constructor() {
    super();

    this.state = {
      endFightReason: '',
      endFightTime: 0,
      fightId: 0,
      fighterId: '',
      roundId: 0,
      judgeId:''
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount(){
    this.setState({
      endFightTime: this.props.roundEndTime,
      judgeId: this.props.judgeId,
      fighterId: this.props.fighterId,
      fightId: this.props.fightId,
      roundId: this.props.roundId
    });
  }

  handleSelect(reason) {
    this.setState({
      endFightReason: reason
    });
  }

  handlePress(){
    let request = {
      requestType: requestTypes.PrematureEnd,
      data: {
        injury: this.state.endFightReason,
        injuryTime: this.state.endFightTime,
        judgeId: this.state.judgeId,
        fighterId: this.state.fighterId,
        fightId: this.state.fightId,
        roundId: this.state.roundId
      }
    }
    request.data = JSON.stringify(request.data);

    let serizedRequest = JSON.stringify(request);
    this.props.sendMessage(serizedRequest)
  }
  render() {

    return (
      <Col style={ { backgroundColor: this.props.primaryBackgroundColor, justifyContent: 'center', alignItems: 'center' } }>
      <Row>
        <H1 style={ { color: '#ffffff' } }>{ this.props.playerName }</H1>
      </Row>
      <Row>
        <ReasonPanel header="KO" buttonNames={ ["HEAD", "BODY"] } reason={ this.state.endFightReason } handleSelect={ this.handleSelect } backgroundColor={this.props.secondaryBackgroundColor }/>
      </Row>
      <Row>
        <ReasonPanel header="RSC" buttonNames={ ["INJ", "INJ BODY", "INJ HEAD", "CCTL", "OUTCLASS"] } reason={ this.state.endFightReason } handleSelect={ this.handleSelect } backgroundColor={this.props.secondaryBackgroundColor } />
      </Row>
      <Row>
        <ReasonPanel header='' buttonNames={ ["NOCONTEST", "RET", "WO"] } reason={ this.state.endFightReason } handleSelect={ this.handleSelect } backgroundColor={this.props.secondaryBackgroundColor } />
      </Row>
      <Button full light style={{margin:5}} onPress={this.handlePress}><H1>ACCEPT</H1></Button>
      </Col>
      );
  }
}

export default PrematureEndPanel;