import React, { Component } from 'react';
import { Button, Text } from 'native-base';
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
              <Button light full style={ this.props.selected ? styles.selected : styles.default } onPress={ this.props.setPoint }>
                <Text>
                  { this.props.pointValue }
                </Text>
              </Button>
            </Row>
            </Col>
            );
    }
}

export default PointButton;