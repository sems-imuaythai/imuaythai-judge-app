import React from "react";
import WarningButton from "./WarningButton";
import PointButton from "./PointButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text, Input, H1, Title, Body } from "native-base";
import { StyleSheet } from "react-native";

const PlayerPointsView = props => {
  const setPoint = value => {
    let point = {
      id: props.fighterId,
      name: "points",
      value: value,
      action: "SET_POINTS"
    };

    props.setWarnings(point);
  };

  const setWarning = (name, action) => {
    let point = {
      id: props.fighterId,
      name: name,
      action: action
    };
    props.setWarnings(point);
  };

  let numberArray = [5, 6, 7, 8, 9, 10];
  let warningsArray = [
    { symbol: "C", name: "cautions" },
    { symbol: "KD", name: "knockDown" },
    { symbol: "W", name: "warnings" },
    { symbol: "J", name: "j" },
    { symbol: "X", name: "x" }
  ];

  let mappedPointButtons = numberArray.map((val, i) => (
    <PointButton
      key={i}
      pointValue={val}
      disabled={props.disabled}
      setPoint={() => setPoint(val)}
      selected={props.point.points === val}
      color={props.primaryBackgroundColor}
    />
  ));

  let mappedWarningButtons = warningsArray.map((val, i) => (
    <WarningButton
      key={i}
      symbol={val.symbol}
      playerBackgrounColor={props.secondaryBackgroundColor}
      symbolCount={props.point[val.name]}
      increment={() => setWarning(val.name, "INCREMENT_WARNING")}
      decrement={() => setWarning(val.name, "DECREMENT_WARNING")}
      disabled={props.disabled}
    />
  ));
  return (
    <Col
      style={{
        backgroundColor: props.primaryBackgroundColor,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Row>
        <H1 style={{ color: "#ffffff" }}>{props.playerName}</H1>
      </Row>
      <Row>
        <Grid style={{ marginTop: 10 }}>{mappedWarningButtons}</Grid>
      </Row>
      <Row>
        <Grid style={{ marginTop: 10 }}>{mappedPointButtons}</Grid>
      </Row>
      <Button
        full
        large
        light
        style={{ margin: 5 }}
        disabled={props.disabled}
        onPress={props.sendPoints}>
        <Text>ACCEPT</Text>
      </Button>
    </Col>
  );
};

export default PlayerPointsView;
