import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';
import { StyleSheet } from 'react-native';

class EditPoints extends Component {
    render() {
        return (
            <Grid>
              <Col>
              <Row>
                <H1>Blue points</H1>
              </Row>
              <Row>
                <H1>Red points</H1>
              </Row>
              </Col>
            </Grid>
            );
    }
}

export default EditPoints;