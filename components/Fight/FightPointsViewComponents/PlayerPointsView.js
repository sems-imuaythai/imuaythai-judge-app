import React, { Component } from 'react';
import WarningButton from './WarningButton';
import PointButton from './PointButton';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Text, Input, H1, Title, Body } from 'native-base';
import { StyleSheet } from 'react-native';

class PlayerPointsView extends Component {

    render() {
        var numberArray = [5, 6, 7, 8, 9, 10];
        var mappedPointButtons = numberArray.map((val, i) => <PointButton key={ i } pointValue={ val } />)
        return (
            <Col style={ { backgroundColor: this.props.primaryBackgroundColor, justifyContent: 'center', alignItems: 'center' } }>
            <Row>
              <H1 style={ { color: '#ffffff' } }>{ this.props.playerName }</H1>
            </Row>
            <Row>
              <Grid style={ { marginTop: 10 } }>
                <WarningButton symbol="C" playerBackgrounColor={ this.props.secondaryBackgroundColor } />
                <WarningButton symbol="KD" warningCount="0" playerBackgrounColor={ this.props.secondaryBackgroundColor } />
                <WarningButton symbol="W" warningCount="0" playerBackgrounColor={ this.props.secondaryBackgroundColor } />
                <WarningButton symbol="J" warningCount="0" playerBackgrounColor={ this.props.secondaryBackgroundColor } />
                <WarningButton symbol="X" warningCount="0" playerBackgrounColor={ this.props.secondaryBackgroundColor } />
              </Grid>
            </Row>
            <Row>
              <Grid style={ { marginTop: 10 } }>
                { mappedPointButtons }
              </Grid>
            </Row>
            <Button full large light style={ { margin: 5 } }>
              <Text>ACCEPT</Text>
            </Button>
            </Col>
            );
    }
}

export default PlayerPointsView;