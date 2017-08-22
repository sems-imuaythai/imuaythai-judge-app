import React, { Component } from 'react';
import WarningButton from './WarningButton';
import PointButton from './PointButton';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Text, Input, H1, Title, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import * as requestTypes from '../../../containers/Fight/requestTypes';
const initialState = {
  cautions: 0,
  knockDown: 0,
  warnings: 0,
  j: 0,
  x: 0,
  points: 0,
  judgeId: '',
  fighterId: '',
  roundId: 0,
  fightId: 0,
  disabled: false
}
class PlayerPointsView extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.incrementWarning = this.incrementWarning.bind(this);
    this.decrementWarning = this.decrementWarning.bind(this);
    this.setPoint = this.setPoint.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentDidUpdate() {
    if (this.props.roundId != this.state.roundId)
      this.setState({
        judgeId: this.props.judgeId,
        fighterId: this.props.fighterId,
        fightId: this.props.fightId,
        roundId: this.props.roundId,
        cautions: 0,
        knockDown: 0,
        warnings: 0,
        j: 0,
        x: 0,
        points: 0,
        disabled: false
      })
  }

  incrementWarning(warning) {
    this.setState((prevState, props) => ({
      [warning]: prevState[warning] + 1
    }))
  }

  decrementWarning(warning) {
    if (this.state[warning] > 0)
      this.setState((prevState, props) => ({
        [warning]: prevState[warning] - 1
      }))
  }

  setPoint(point) {
    this.setState({
      points: point
    })
  }

  handleAccept() {
    var request = {
      requestType: requestTypes.SendPoints,
      data: JSON.stringify(this.state)
    }

    var serizedRequest = JSON.stringify(request);

    this.props.sendPoints(serizedRequest);
    this.setState({
      disabled: true
    })
  }


  render() {
    var numberArray = [5, 6, 7, 8, 9, 10];
    var mappedPointButtons = numberArray.map((val, i) => <PointButton key={ i } pointValue={ val } setPoint={ () => this.setPoint(val) } selected={ this.state.points === val } color={ this.props.primaryBackgroundColor } />)
    return (
      <Col style={ { backgroundColor: this.props.primaryBackgroundColor, justifyContent: 'center', alignItems: 'center' } }>
      <Row>
        <H1 style={ { color: '#ffffff' } }>{ this.props.playerName }</H1>
      </Row>
      <Row>
        <Grid style={ { marginTop: 10 } }>
          <WarningButton symbol="C" playerBackgrounColor={ this.props.secondaryBackgroundColor } symbolCount={ this.state.cautions } increment={ () => this.incrementWarning("cautions") } decrement={ () => this.decrementWarning("cautions") }
            disabled={ this.state.disabled } />
          <WarningButton symbol="KD" playerBackgrounColor={ this.props.secondaryBackgroundColor } symbolCount={ this.state.knockDown } increment={ () => this.incrementWarning("knockDown") } decrement={ () => this.decrementWarning("knockDown") }
            disabled={ this.state.disabled } />
          <WarningButton symbol="W" playerBackgrounColor={ this.props.secondaryBackgroundColor } symbolCount={ this.state.warnings } increment={ () => this.incrementWarning("warnings") } decrement={ () => this.decrementWarning("warnings") }
            disabled={ this.state.disabled } />
          <WarningButton symbol="J" playerBackgrounColor={ this.props.secondaryBackgroundColor } symbolCount={ this.state.j } increment={ () => this.incrementWarning("j") } decrement={ () => this.decrementWarning("j") }
            disabled={ this.state.disabled } />
          <WarningButton symbol="X" playerBackgrounColor={ this.props.secondaryBackgroundColor } symbolCount={ this.state.x } increment={ () => this.incrementWarning("x") } decrement={ () => this.decrementWarning("x") }
            disabled={ this.state.disabled } />
        </Grid>
      </Row>
      <Row>
        <Grid style={ { marginTop: 10 } }>
          { mappedPointButtons }
        </Grid>
      </Row>
      <Button full large light style={ { margin: 5 } } disabled={ this.state.disabled } onPress={ this.handleAccept }>
        <Text>ACCEPT</Text>
      </Button>
      </Col>
      );
  }
}

export default PlayerPointsView;