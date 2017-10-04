import React, { Component } from "react";
import { Container, Content, Text, Title } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import FightHeader from "../../containers/Fight/FightHeaderContainer";
import PlayerPointsView from "./FightPointsViewComponents/PlayerPointsView";

const FightPointsView = props => {
  const { fight } = props;
  const redFighterName =
    fight.redAthlete.firstName + " " + fight.redAthlete.surname;
  const blueFighterName =
    fight.blueAthlete.firstName + " " + fight.blueAthlete.surname;
  return (
    <Container>
      <Content style={{ marginTop: 25 }}>
        <FightHeader />
        <Grid>
          <PlayerPointsView
            primaryBackgroundColor="#cd2626"
            secondaryBackgroundColor="#720000"
            playerName={redFighterName}
            setWarnings={props.setWarnings}
            sendPoints={() => {
              props.sendPoints(fight.redAthlete.id);
            }}
            point={props.points.find(
              point => point.fighterId === fight.redAthlete.id
            )}
            fighterId={fight.redAthlete.id}
            addToHistory={props.addToHistory}
            disabled={props.disabled}
          />
          <PlayerPointsView
            primaryBackgroundColor="#1874cd"
            secondaryBackgroundColor="#000080"
            playerName={redFighterName}
            setWarnings={props.setWarnings}
            sendPoints={() => {
              props.sendPoints(fight.blueAthlete.id);
            }}
            point={props.points.find(
              point => point.fighterId === fight.blueAthlete.id
            )}
            fighterId={fight.blueAthlete.id}
            addToHistory={props.addToHistory}
            disabled={props.disabled}
          />
        </Grid>
      </Content>
    </Container>
  );
};

export default FightPointsView;
