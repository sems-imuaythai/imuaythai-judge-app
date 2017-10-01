import React, { Component } from "react";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import JudgeTable from "./FightMainJudgeViewComponents/JudgeTable";

const FightMainJudgeView = props => {
  const judgeMappings = props.fight.fightJudgesMappings.filter(
    judge => judge.main === 0
  );
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
              onPress={props.showPrematuredPanels}>
              <Text>Show injury panel</Text>
            </Button>
          </Col>
          <Col>
            <Button block large bordered warning onPress={props.endFight}>
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
          onPress={props.acceptPoints}>
          <H1>ACCEPT POINTS</H1>
        </Button>
      </Content>
    </Container>
  );
};

export default FightMainJudgeView;
