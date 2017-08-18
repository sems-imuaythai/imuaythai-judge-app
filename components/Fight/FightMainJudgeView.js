import React, { Component } from 'react';
import FightHeader from './FightHeader';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Text, Title, H1, Button } from 'native-base';
import JudgeTable from './FightMainJudgeViewComponents/JudgeTable';

import * as requestType from '../../containers/Fight/requestTypes';


class FightMainJudgeView extends Component {
  constructor() {
    super();

    this.state = {
      rounds: [],
      startRound: false
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    let parsedMessage = JSON.stringify(message);

    this.props.sendMessage(parsedMessage);
  }
  setRound() {
    if (this.state.startRound) {
      this.sendMessage({
        requestType: requestType.EndRound,
        data: null
      });
    } else {
      this.sendMessage({
        requestType: requestType.StartRound,
        data: null
      });
    }
    this.setState((prevState) => ({
      startRound: !prevState.startRound
    }))
  }

  handlePoints(points) {
    console.log(points);
    const {fight} = this.props;
    let round = this.state.rounds.find(r => r.id === points.roundId);
    let roundArrayId = this.state.rounds.indexOf(round);
    let judge = round.judges.find(j => j.id === points.judgeId);
    let judgeArrayId = round.judges.indexOf(judge);
    if (fight.redAthleteId === points.fighterId)
      judge.redPoints = points.points
    else
      judge.bluePoints = points.points;

    round.judges = round.judges.slice(0, judgeArrayId).concat(judge).concat(round.judges.slice(judgeArrayId + 1));
    this.state.rounds.slice(0, roundArrayId).concat(round).concat(this.state.rounds.slice(roundArrayId + 1));

    this.setState((prevState) => ({
      rounds: prevState.rounds.slice(0, roundArrayId).concat(round).concat(prevState.rounds.slice(roundArrayId + 1))
    }));

  }

  handleStartRound(roundId) {
    const judgeMappings = this.props.fight.fightJudgesMappings.filter(judge => judge.main === 0);
    let round = {
      id: roundId,
      judges: []
    }
    for (let key in judgeMappings) {
      let mapping = judgeMappings[key];
      let judge = {
        id: mapping.judge.id,
        firstName: mapping.judge.firstName,
        surname: mapping.judge.surname,
        redPoints: 0,
        bluePoints: 0
      }

      round.judges.push(judge);
    }
    this.setState((prevState) => ({
      rounds: prevState.rounds.concat([round])
    }));

  }

  showPrematuredPanels() {}

  endFight() {}

  componentDidUpdate() {
    const {message} = this.props;
    let matched = true;
    switch (message.requestType) {
      case requestType.SendPoints:
        this.handlePoints(message.data);
        break;

      case requestType.StartRound:
        this.handleStartRound(message.data);
        break;

      case requestType.Connect:
        if (!this.props.JuryConnected)
          this.sendMessage({
            requestType: requestType.JuryConnected,
            data: null
          });
        break;
      case requestType.JuryConnected:
        this.props.notifyOnJuryConnected();
      default:
        matched = false
        break;
    }
    if (matched) {
      this.props.clearMessage();
    }
  }


  render() {
    console.log('====================================');
    console.log(this.state);
    console.log('====================================');
    const judgeMappings = this.props.fight.fightJudgesMappings.filter(judge => judge.main === 0);
    const {user, fight} = this.props;
    return (
      <Container>
        <Content>
          <FightHeader user={ user } fight={ fight } />
          <Grid>
            <Col style={ { backgroundColor: '#cd2626' } }>
            <Row>
              <H1>{ fight.redAthlete.firstName + " " + fight.redAthlete.surname }</H1>
            </Row>
            </Col>
            <Col style={ { backgroundColor: '#1874cd' } }>
            <Row>
              <H1>{ fight.blueAthlete.firstName + " " + fight.blueAthlete.surname }</H1>
            </Row>
            </Col>
          </Grid>
          <Grid>
            <Col>
            <Button block large bordered warning onPress={ this.setRound.bind(this) }>
              <Text>
                { this.state.startRound ? "End round" : "Start round" }
              </Text>
            </Button>
            </Col>
            <Col>
            <Button block large bordered warning>
              <Text>
                Show injury panel
              </Text>
            </Button>
            </Col>
            <Col>
            <Button block large bordered warning>
              <Text>
                End Fight
              </Text>
            </Button>
            </Col>
          </Grid>
          <JudgeTable judgeMappings={ judgeMappings } rounds={ this.state.rounds } />
        </Content>
      </Container>

      );
  }
}

export default FightMainJudgeView;