import React, { Component } from "react";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import JudgeTable from "./FightMainJudgeViewComponents/JudgeTable";
import { Alert } from "react-native";
const createAlert = (title, text, callback) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          callback();
        }
      }
    ],
    { cancelable: false }
  );
};
const FightMainJudgeView = props => {
  const judgeMappings = props.fight.fightJudgesMappings.filter(
    judge => judge.main === 0
  );

  const showPrematurePanelsAlert = () => {
    createAlert(
      "Warning",
      "Are you sure you want to show injury panels?",
      props.showPrematuredPanels
    );
  };
  const endFightAlert = () => {
    createAlert(
      "Warning",
      "Are you sure you want to end fight?",
      props.endFight
    );
  };

  const acceptPointsAlert = () => {
    createAlert(
      "Warning",
      "Are you sure you want to send points to accept?",
      props.acceptPoints
    );
  };
  const { user, fight } = props;
  return (
    <Container>
      <Content style={{ marginTop: 25 }}>
        <FightHeader showTimer={true} />
        <Grid>
          <Col
            style={{
              backgroundColor: "#cd2626",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Row>
              <H1 style={{ color: "#ffffff" }}>
                {fight.redAthlete.firstName + " " + fight.redAthlete.surname}
              </H1>
            </Row>
          </Col>
          <Col
            style={{
              backgroundColor: "#1874cd",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Row>
              <H1 style={{ color: "#ffffff" }}>
                {fight.blueAthlete.firstName + " " + fight.blueAthlete.surname}
              </H1>
            </Row>
          </Col>
        </Grid>
        <Grid>
          <Col>
            <Button
              block
              large
              bordered
              warning
              onPress={showPrematurePanelsAlert}>
              <Text>Show injury panel</Text>
            </Button>
          </Col>
          <Col>
            <Button block large bordered warning onPress={endFightAlert}>
              <Text>End Fight</Text>
            </Button>
          </Col>
        </Grid>
        <JudgeTable
          judgeMappings={judgeMappings}
          rounds={props.rounds}
          editPoints={props.editPoints}
        />
        <Button
          disabled={props.disabled}
          block
          large
          success
          onPress={acceptPointsAlert}>
          <H1>ACCEPT POINTS</H1>
        </Button>
      </Content>
    </Container>
  );
};

export default FightMainJudgeView;
