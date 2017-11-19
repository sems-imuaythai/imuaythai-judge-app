import React, { Component } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import { StyleSheet } from "react-native";
import PointButton from "../FightPointsViewComponents/PointButton";

class EditPoints extends Component {
  constructor() {
    super();
    this.state = {
      redPoints: 0,
      bluePoints: 0
    };
    this.redSetPoint = this.redSetPoint.bind(this);
    this.blueSetPoint = this.blueSetPoint.bind(this);
  }
  componentWillMount() {
    const { data } = this.props;
    this.setState({
      redPoints: data.redPoints,
      bluePoints: data.bluePoints
    });
  }
  redSetPoint(val) {
    this.setState({
      redPoints: val
    });
  }
  blueSetPoint(val) {
    this.setState({
      bluePoints: val
    });
  }

  handleSave() {
    const { data } = this.props;
    if (!(this.state.redPoints == 10 || this.state.bluePoints == 10)) return;
    let points = {
      roundId: data.roundId,
      judgeId: data.judgeId,
      redPoints: this.state.redPoints,
      bluePoints: this.state.bluePoints
    };

    this.props.editPoints(points);
    this.props.toggleModal(points);
  }
  render() {
    let numberArray = [5, 6, 7, 8, 9, 10];
    let mappedRedPointButtons = numberArray.map((val, i) => (
      <PointButton
        key={i}
        pointValue={val}
        setPoint={() => this.redSetPoint(val)}
        selected={this.state.redPoints === val}
        color="red"
      />
    ));
    let mappedBluePointButtons = numberArray.map((val, i) => (
      <PointButton
        key={i}
        pointValue={val}
        setPoint={() => this.blueSetPoint(val)}
        selected={this.state.bluePoints === val}
        color="blue"
      />
    ));
    return (
      <Grid style={{ backgroundColor: "#b2b2b2" }}>
        <Col>
          <Row style={{ alignContent: "center", alignItems: "center" }}>
            <Grid>{mappedRedPointButtons}</Grid>
          </Row>
          <Row>
            <Grid>{mappedBluePointButtons}</Grid>
          </Row>
          <Button info large block onPress={this.handleSave.bind(this)}>
            <H1>SAVE</H1>
          </Button>
        </Col>
      </Grid>
    );
  }
}

export default EditPoints;
