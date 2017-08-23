import React, { Component } from 'react';
import { Button, Text, H1 } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { StyleSheet } from 'react-native';

class PointButton extends Component {
    render() {

        const styles = {
            default: {
                height: 70,
                width: 70
            },
            selected: {
                height: 70,
                width: 70,
                backgroundColor: this.props.color
            }
        }
        return (
            <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
            <Row style={ { justifyContent: 'center', alignItems: 'center' } }>
              <Button light full disabled={this.props.disabled} style={ this.props.selected ? styles.selected : styles.default } onPress={ this.props.setPoint }>
                <H1>
                  { this.props.pointValue.toString() }
                </H1>
              </Button>
            </Row>
            </Col>
            );
    }
}

export default PointButton;