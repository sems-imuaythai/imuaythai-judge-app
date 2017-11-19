import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import Timer from "../../common/timer";
const options = {
  container: {},
  text: {
    fontSize: 20,
    color: "#FFF",
    marginLeft: 7
  }
};
const getFightStatus = props => {
  if (props.started && props.roundId !== "") {
    if (props.paused) return "Round paused";
    else return "Round started";
  } else if (!props.started && props.roundId === "") return "Fight not started";
  else if (props.roundId < props.fight.structure.round.roundsCount)
    return `Round #${props.roundId} ended`;
  else return "Fight ended";
};

const FightHeader = props => {
  const { user, fight, timer } = props;
  return (
    <Grid>
      <Col style={{ width: "75%" }}>
        <Text>
          Logged as:
          {user.firstName + " " + user.surname}
        </Text>
        <Text>
          Weight category:
          {fight.structure.weightAgeCategory.name}
        </Text>
        <Text>
          Fight duration:
          {fight.structure.round.roundsCount.toString() + " rounds"}
        </Text>
        <Text>
          Referee:
          {fight.referee.firstName + " " + fight.referee.surname}
        </Text>
      </Col>
      <Col
        style={{
          backgroundColor: props.started
            ? props.paused ? "#f2f200" : "#18c90a"
            : "#ff3030",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {props.showTimer ? (
          <Timer
            timerType={timer.active}
            totalDuration={
              timer.active === "fight"
                ? fight.structure.round.duration * 1000
                : fight.structure.round.breakDuration * 1000
            }
            msecs
            start={
              timer.active === "fight"
                ? timer.fightTimerStart
                : timer.pauseTimerStart
            }
            reset={
              timer.active === "fight"
                ? timer.fightTimerReset
                : timer.pauseTimerReset
            }
            options={options}
            handleFinish={
              timer.active === "fight"
                ? props.fightTimerCallback
                : props.pauseTimerCallback
            }
            playPreSound={props.playPreSound}
            startBlinking={props.startBlinking}
          />
        ) : (
          <Title>{getFightStatus(props)}</Title>
        )}
      </Col>
    </Grid>
  );
};

export default FightHeader;
