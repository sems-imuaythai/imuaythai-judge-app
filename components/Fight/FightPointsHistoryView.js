import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  rowBorder: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#fff'
  }
})
class FightPointsHistoryView extends Component {
  constructor() {
    super();

    this.buildRows = this.buildRows.bind(this);
  }

  buildRows(rounds) {
    return rounds.map((round, key) => (
      <Col key={ key }>
      <Row style={ styles.rowBorder }>
        <Text style={ styles.whiteText }>Round
          { round.id }
        </Text>
      </Row>
      { round.points.map((item, i) => (
          <Row key={ i } style={ styles.rowBorder }>
            <Text style={ styles.whiteText }>
              { item.value }
            </Text>
          </Row>
        )) }
      </Col>)
    );
  }

  render() {
    const {fight, rounds} = this.props;
    let names = <Row style={ styles.rowBorder }></Row>;
    const redPoints = rounds.filter((round) => round.fighterId === fight.redAthleteId);
    const bluePoints = rounds.filter((round) => round.fighterId === fight.blueAthleteId);
    if (rounds.length > 0)
      names = rounds[0].points.map((item, key) => <Row key={ key } style={ styles.rowBorder }>
                                                    <Text>
                                                      { item.name }
                                                    </Text>
                                                  </Row>);
    const redRows = this.buildRows(redPoints);
    const blueRows = this.buildRows(bluePoints);
    return (
      <Container>
        <Content>
          <Grid style={ { marginTop: 25 } }>
            <Col>
            <Row style={ styles.rowBorder }>
              <Text>points names</Text>
            </Row>
            <Row style={ styles.rowBorder }></Row>
            { names }
            </Col>
            <Col style={ { backgroundColor: '#cd2626' } }>
            <Row style={ styles.rowBorder }>
              <Text style={ styles.whiteText }>
                { fight.redAthlete.firstName + " " + fight.redAthlete.surname }
              </Text>
            </Row>
            <Row>
              { redRows }
            </Row>
            </Col>
            <Col style={ { backgroundColor: '#1874cd' } }>
            <Row style={ styles.rowBorder }>
              <Text style={ styles.whiteText }>
                { fight.blueAthlete.firstName + " " + fight.blueAthlete.surname }
              </Text>
            </Row>
            <Row>
              { blueRows }
            </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
      );
  }
}

export default FightPointsHistoryView;