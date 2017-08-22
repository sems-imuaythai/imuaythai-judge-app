import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  dimensions: {
    width: 85,
    height: 85
  },
  rowBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    width: '100%'
  }
});

class JudgeTable extends Component {
  render() {
    let roundArray = [];
    const {judgeMappings, rounds} = this.props;
    const renderIds = judgeMappings.map((judge, key) => (
      <Row key={ key } style={ styles.rowBorder }>
        <H1>{ (key + 1).toString() }</H1>
      </Row>));

    const renderNames = judgeMappings.map((mapping, key) => (
      <Row key={ key } style={ styles.rowBorder }>
        <H1>{ mapping.judge.firstName + " " + mapping.judge.surname }</H1>
      </Row>));

    const renderRounds = rounds.map((round, i) => (
      <Col style={ { justifyContent: 'center', alignItems: 'center' } } key={ i }>
      <Row style={ styles.rowBorder }>
        <H1>Round { i + 1 }</H1>
      </Row>
      { round.judges.map((judge, key) => (
          <Row key={ key } style={ styles.rowBorder }>
            <Button light full style={ styles.dimensions }>
              <H1>{ judge.redPoints + "/" + judge.bluePoints }</H1>
            </Button>
          </Row>)) }
      </Col>));
    return (
      <Grid style={ { backgroundColor: '#acacac' } }>
        <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
        <Row style={ styles.rowBorder }>
          <H1>Id</H1>
        </Row>
        { renderIds }
        </Col>
        <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
        <Row style={ styles.rowBorder }>
          <H1>Name</H1>
        </Row>
        { renderNames }
        </Col>
        { renderRounds }
      </Grid>

      );
  }
}

export default JudgeTable;