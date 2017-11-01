import React, { Component } from "react";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
import { Container, Content, Text, Title, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import PrematureEndPanel from "./FightPrematureEndPanelsComponents/PrematureEndPanel";

class FightPrematureEndPanels extends Component {
  render() {
    const { fight } = this.props;
    const redFighterName =
      fight.redAthlete.firstName + " " + fight.redAthlete.surname;
    const blueFighterName =
      fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
    return (
      <Container>
        <Content style={{ marginTop: 25 }}>
          <FightHeader showTimer={this.props.isAdmin} />
          {this.props.isAdmin ? (
            <Grid>
              <Col>
                <Button
                  block
                  large
                  bordered
                  warning
                  onPress={this.props.endFight}>
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
              sendInjury={this.props.sendInjury}
              fighterId={fight.redAthlete.id}
              disabled={this.props.disabled}
              isMain={this.props.isAdmin}
            />
            <PrematureEndPanel
              primaryBackgroundColor="#1874cd"
              secondaryBackgroundColor="#000080"
              playerName={blueFighterName}
              sendInjury={this.props.sendInjury}
              fighterId={fight.blueAthlete.id}
              disabled={this.props.disabled}
              isMain={this.props.isAdmin}
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default FightPrematureEndPanels;
