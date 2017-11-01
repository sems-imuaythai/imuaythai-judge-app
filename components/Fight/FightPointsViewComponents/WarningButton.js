import React from "react";
import { H1, H2, Button } from "native-base";
import { StyleSheet } from "react-native";
import { Col, Row } from "react-native-easy-grid";

const WarningButton = props => {
  let style = StyleSheet.create({
    centerElements: {
      justifyContent: "center",
      alignItems: "center"
    }
  });
  return (
    <Col style={style.centerElements}>
      <Row style={style.centerElements}>
        <Button
          large
          full
          light
          style={{ height: 85, width: 85 }}
          disabled={props.disabled}
          onPress={props.increment}>
          <H1>{props.symbol}</H1>
        </Button>
      </Row>
      <Row
        style={{
          height: 85,
          width: 85,
          backgroundColor: props.playerBackgrounColor,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <H2 style={{ color: "#ffffff" }}>{props.symbolCount.toString()}</H2>
      </Row>
      <Row style={style.centerElements}>
        <Button
          large
          full
          light
          style={{ height: 85, width: 85 }}
          disabled={props.disabled}
          onPress={props.decrement}>
          <H1> - </H1>
        </Button>
      </Row>
    </Col>
  );
};

export default WarningButton;
