import React, { Component } from "react";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
import { Container, Content, Text, Title, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import PrematureEndPanel from "./FightPrematureEndPanelsComponents/PrematureEndPanel";

class FightPrematureEndPanels extends Component {
  render() {
    const { fight, user } = this.props;
    const redFighterName =
      fight.redAthlete.firstName + " " + fight.redAthlete.surname;
    const blueFighterName =
      fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
    return (
      <Container>
        <Content style={{ marginTop: 25 }}>
          <FightHeader />
          {this.props.isAdmin ? (
            <Grid>
              <Col>
                <Button
                  block
                  large
                  bordered
                  warning
                  onPress={this.endFight.bind(this)}>
                  <Text>End Fight</Text>
                </Button>
              </Col>
            </Grid>
          ) : null}
          <Grid>
            <PrematureEndPanel
              primaryBackgroundColor="#cd2626"
              secondaryBackgroundColor="#720000"
              playerName={redFighterName}
              sendMessage={this.props.sendMessage}
              roundEndTime={this.props.roundEndTime}
              fighterId={fight.redAthlete.id}
              judgeId={user.id}
              roundId={this.props.roundId}
              fightId={fight.id}
              disabled={this.state.disabled}
              setDisable={this.setDisable.bind(this)}
            />
            <PrematureEndPanel
              primaryBackgroundColor="#1874cd"
              secondaryBackgroundColor="#000080"
              playerName={blueFighterName}
              sendMessage={this.props.sendMessage}
              roundEndTime={this.props.roundEndTime}
              fighterId={fight.blueAthlete.id}
              judgeId={user.id}
              roundId={this.props.roundId}
              fightId={fight.id}
              disabled={this.state.disabled}
              setDisable={this.setDisable.bind(this)}
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default FightPrematureEndPanels;
