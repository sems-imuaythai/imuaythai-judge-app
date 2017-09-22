import React, { Component } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import EditPoints from "./EditPoints";

const styles = StyleSheet.create({
  dimensions: {
    height: 75,
    width: "100%"
  },
  rowBorder: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    height: 75,
    width: "100%"
  }
});

class JudgeTable extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      roundId: 0,
      judgeId: "",
      redPoints: 0,
      bluePoints: 0
    };

    this.calculateMedian = this.calculateMedian.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(info) {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
      roundId: info.roundId,
      judgeId: info.judgeId,
      redPoints: info.redPoints,
      bluePoints: info.bluePoints
    }));
  }

  calculateMedian(array) {
    array.sort((a, b) => a - b);
    let lowMiddle = Math.floor((array.length - 1) / 2);
    let highMiddle = Math.ceil((array.length - 1) / 2);
    let median = (array[lowMiddle] + array[highMiddle]) / 2;

    return median;
  }

  render() {
    let roundArray = [];

    const { judgeMappings, rounds } = this.props;
    const renderIds = judgeMappings.map((judge, key) => (
      <Row key={key} style={styles.rowBorder}>
        <H1>{(key + 1).toString()}</H1>
      </Row>
    ));

    const renderNames = judgeMappings.map((mapping, key) => (
      <Row key={key} style={styles.rowBorder}>
        <H1>{mapping.judge.firstName + " " + mapping.judge.surname}</H1>
      </Row>
    ));

    const renderRounds = rounds.map((round, i) => {
      let bluePoints = [];
      let redPoints = [];
      return (
        <Col style={{ justifyContent: "center", alignItems: "center" }} key={i}>
          <Row style={styles.rowBorder}>
            <H1>Round {i + 1}</H1>
          </Row>
          {round.judges.map((judge, key) => {
            bluePoints.push(judge.bluePoints);
            redPoints.push(judge.redPoints);
            return (
              <Row key={key} style={styles.rowBorder}>
                <Button
                  light
                  full
                  style={styles.dimensions}
                  onPress={() =>
                    this.toggleModal({
                      roundId: round.id,
                      judgeId: judge.id,
                      redPoints: judge.redPoints,
                      bluePoints: judge.bluePoints
                    })}>
                  <H1>{judge.redPoints + "/" + judge.bluePoints}</H1>
                </Button>
              </Row>
            );
          })}
          <Row style={styles.rowBorder}>
            <H1>
              {this.calculateMedian(redPoints).toString() +
                "/" +
                this.calculateMedian(bluePoints).toString()}
            </H1>
          </Row>
        </Col>
      );
    });
    return (
      <Grid style={{ backgroundColor: "#acacac" }}>
        <Col
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "10%"
          }}>
          <Row style={styles.rowBorder}>
            <H1>Id</H1>
          </Row>
          {renderIds}
          <Row style={styles.rowBorder}>
            <Text> </Text>
          </Row>
        </Col>
        <Col style={{ justifyContent: "center", alignItems: "center" }}>
          <Row style={styles.rowBorder}>
            <H1>Name</H1>
          </Row>
          {renderNames}
          <Row style={styles.rowBorder}>
            <H1>Total</H1>
          </Row>
        </Col>
        {renderRounds}
        <Modal isVisible={this.state.isModalVisible}>
          <EditPoints
            editPoints={this.props.editPoints}
            data={this.state}
            toggleModal={this.toggleModal}
          />
        </Modal>
      </Grid>
    );
  }
}

export default JudgeTable;
