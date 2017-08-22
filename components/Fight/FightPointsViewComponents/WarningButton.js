import React, { Component } from 'react';
import { H1, H2, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';


class WarningButton extends Component {

  render() {
    var style = StyleSheet.create({
      centerElements: {
        justifyContent: 'center',
        alignItems: 'center'
      },
    });
    return (
      <Col style={ style.centerElements }>
      <Row style={ style.centerElements }>
        <Button large full light style={ { height: 85, width: 85 } } disabled={ this.props.disabled } onPress={ this.props.increment }>
          <H1>{ this.props.symbol }</H1>
        </Button>
      </Row>
      <Row style={ { height: 85, width: 85, backgroundColor: this.props.playerBackgrounColor, justifyContent: 'center', alignItems: 'center' } }>
        <H2 style={ { color: '#ffffff' } }>{ this.props.symbolCount.toString() }</H2>
      </Row>
      <Row style={ style.centerElements }>
        <Button large full light style={ { height: 85, width: 85 } } disabled={ this.props.disabled } onPress={ this.props.decrement }>
          <H1> - </H1>
        </Button>
      </Row>
      </Col>
      );
  }
}

export default WarningButton;