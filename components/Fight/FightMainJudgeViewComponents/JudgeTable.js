import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';

class JudgeTable extends Component {

  render() {
    let roundArray = [];
    const {judgeMappings, rounds} = this.props;
    const renderIds = judgeMappings.map((judge, key) => (
      <Row key={ key } style={ { borderColor: 'black' } }>
        <Text>
          { key + 1 }
        </Text>
      </Row>));

    const renderNames = judgeMappings.map((mapping, key) => (
      <Row key={ key } style={ { borderColor: 'black' } }>
        <Text>
          { mapping.judge.firstName + " " + mapping.judge.surname }
        </Text>
      </Row>));

    const renderRounds = rounds.map((round, i) => (
      <Col style={ { justifyContent: 'center', alignItems: 'center' } } key={ i }>
      <Row>
        <Text>
          { "Round" + (i + 1) }
        </Text>
      </Row>
      { round.judges.map((judge, key) => (
          <Row key={ key }>
            <Button>
              <Text>
                { judge.redPoints + "/" + judge.bluePoints }
              </Text>
            </Button>
          </Row>)) }
      </Col>));
    return (
      <Grid>
        <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
        <Row style={ { borderColor: 'black' } }>
          <Text>Id</Text>
        </Row>
        { renderIds }
        </Col>
        <Col style={ { justifyContent: 'center', alignItems: 'center' } }>
        <Row style={ { borderColor: 'black' } }>
          <Text>Name</Text>
        </Row>
        { renderNames }
        </Col>
        { renderRounds }
      </Grid>
      );
  }
}

export default JudgeTable;