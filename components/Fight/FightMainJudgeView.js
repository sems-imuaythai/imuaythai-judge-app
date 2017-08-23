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
      startRound: false,
      roundEndTime: 0
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
  editPoints(points) {
    let round = this.state.rounds.find(r => r.id === points.roundId);
    let roundArrayId = this.state.rounds.indexOf(round);
    let judge = round.judges.find(j => j.id === points.judgeId);
    let judgeArrayId = round.judges.indexOf(judge);
    judge.redPoints = points.redPoints
    judge.bluePoints = points.bluePoints;

    round.judges = round.judges.slice(0, judgeArrayId).concat(judge).concat(round.judges.slice(judgeArrayId + 1));

    this.setState((prevState) => ({
      rounds: prevState.rounds.slice(0, roundArrayId).concat(round).concat(prevState.rounds.slice(roundArrayId + 1))
    }));
  }

  handlePoints(points) {
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
        fightId: this.props.fight.id,
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

  showPrematuredPanels() {
    this.sendMessage({
      requestType: requestType.ShowPrematureEndPanel,
      data: null
    });
  }

  endFight() {
    const {fight} = this.props;
    this.sendMessage({
      requestType: requestType.EndFight,
      data: fight.id
    });
    this.props.logout();
  }
  handleAcceptPoints() {
    let pointsToAccept = [];

    for (let roundId in this.state.rounds) {
      let round = this.state.rounds[roundId];
      for (let judgeId in round.judges) {
        let judge = round.judges[judgeId];
        let redPoints = {
          points: judge.redPoints,
          judgeId: judge.id,
          fightId: judge.fightId,
          fighterId: this.props.fight.redAthleteId,
          roundId: round.id,
          accepted: true
        }
        let redPointsString = JSON.stringify(redPoints);
        pointsToAccept.push(redPointsString);

        let bluePoints = {
          points: judge.bluePoints,
          judgeId: judge.id,
          fightId: judge.fightId,
          fighterId: this.props.fight.blueAthleteId,
          roundId: round.id,
          accepted: true
        }
        let bluePointsString = JSON.stringify(bluePoints);
        pointsToAccept.push(bluePointsString);
      }
    }

    let pointsArrayString = JSON.stringify(pointsToAccept);

    let request = {
      requestType: requestType.AcceptPoints,
      data: pointsArrayString
    }

    this.sendMessage(request);

  }

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
        break;

      case requestType.SendTime:
        this.setState({
          roundEndTime: message.data
        })
        break;
      default:
        matched = false
        break;
    }
    if (matched) {
      this.props.clearMessage();
    }
  }


  render() {
    const judgeMappings = this.props.fight.fightJudgesMappings.filter(judge => judge.main === 0);
    const {user, fight} = this.props;
    return (
      <Container>
        <Content style={ { marginTop: 25 } }>
          <FightHeader user={ user } fight={ fight } started={ this.state.startRound } />
          <Grid>
            <Col style={ { backgroundColor: '#cd2626', justifyContent: 'center', alignItems: 'center' } }>
            <Row>
              <H1 style={ { color: '#ffffff' } }>{ fight.redAthlete.firstName + " " + fight.redAthlete.surname }</H1>
            </Row>
            </Col>
            <Col style={ { backgroundColor: '#1874cd', justifyContent: 'center', alignItems: 'center' } }>
            <Row>
              <H1 style={ { color: '#ffffff' } }>{ fight.blueAthlete.firstName + " " + fight.blueAthlete.surname }</H1>
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
            <Button block large bordered warning onPress={ this.showPrematuredPanels.bind(this) }>
              <Text>
                Show injury panel
              </Text>
            </Button>
            </Col>
            <Col>
            <Button block large bordered warning onPress={ this.endFight.bind(this) }>
              <Text>
                End Fight
              </Text>
            </Button>
            </Col>
          </Grid>
          <JudgeTable judgeMappings={ judgeMappings } rounds={ this.state.rounds } editPoints={ this.editPoints.bind(this) } />
          <Button block success onPress={ this.handleAcceptPoints.bind(this) }>
            <H1>ACCEPT</H1>
          </Button>
        </Content>
      </Container>

      );
  }
}

export default FightMainJudgeView;