import React from "react";
import { Container, Content, Text, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FightHeader from "../../containers/Fight/FightHeaderContainer";

const FightTimekeeperView = props => {
  return (
    <Container>
      <Content style={{ marginTop: 25 }}>
        <FightHeader showTimer={true} />
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ justifyContent: "center", alignItems: "center" }}>
            <Row>
              <Button
                light
                onPress={props.timerButtonClick}
                style={{
                  width: 400,
                  height: 400,
                  justifyContent: "center",
                  borderWidth: 1.0,
                  borderColor: "#000",
                  marginRight: 1
                }}>
                <Text style={{ fontSize: 20 }}>
                  {props.timer.fightTimerStart ? "PAUSE" : "START"}
                </Text>
              </Button>
            </Row>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};

export default FightTimekeeperView;
