import React, { Component } from "react";
import { Container, Content, Text, Title, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FightHeader from "./FightHeader";
import * as requestType from "../../containers/Fight/requestTypes";

class FightTimekeeperView extends Component {
  render() {
    const { user, fight } = this.props;
    return (
      <Container>
        <Content style={{ marginTop: 25 }}>
          <FightHeader
            user={user}
            fight={fight}
            timerStarted={this.props.timerStart}
            paused={this.props.paused}
            started={this.props.startRound}
            timerReset={this.props.timerReset}
            setRound={this.props.setRound}
            showTimer={true}
          />
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ justifyContent: "center", alignItems: "center" }}>
              <Row>
                <Button
                  light
                  onPress={
                    this.props.startRound ? (
                      this.props.toggleRound
                    ) : (
                      this.props.setRound
                    )
                  }
                  style={{
                    width: 400,
                    height: 400,
                    justifyContent: "center",
                    borderWidth: 1.0,
                    borderColor: "#000",
                    marginRight: 1
                  }}>
                  <Text style={{ fontSize: 80 }}>
                    {this.props.timerStart ? "PAUSE" : "START"}
                  </Text>
                </Button>
              </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default FightTimekeeperView;
