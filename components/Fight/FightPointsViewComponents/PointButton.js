import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Input, H1, Title, Body, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class PointButton extends Component {
    render() {
        return (
            <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
            <Row style={ { height: 70, width: 70, backgroundColor: '#b6b6b6', justifyContent: 'center', alignItems: 'center' } }>
              <H1>{ this.props.pointValue }</H1>
            </Row>
            </Col>
            );
    }
}

export default PointButton;