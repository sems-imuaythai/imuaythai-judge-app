import React, { Component } from "react";
import { Container, Content, Text, Title, Button, H1 } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet } from "react-native";
import ReasonPanel from "./ReasonPanel";
import * as requestTypes from "../../../common/requestTypes";

class PrematureEndPanel extends Component {
  constructor() {
    super();

    this.state = {
      endFightReason: ""
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handleSelect(reason) {
    this.setState({
      endFightReason: reason
    });
  }

  handlePress() {
    let injury = {
      fighterId: this.props.fighterId,
      name: this.state.endFightReason
    };
    this.props.sendInjury(injury);
  }
  render() {
    return (
      <Col
        style={{
          backgroundColor: this.props.primaryBackgroundColor,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Row>
          <H1 style={{ color: "#ffffff" }}>{this.props.playerName}</H1>
        </Row>
        <Row>
          <ReasonPanel
            disabled={this.props.disabled}
            header="KO"
            buttonNames={["HEAD", "BODY"]}
            reason={this.state.endFightReason}
            handleSelect={this.handleSelect}
            backgroundColor={this.props.secondaryBackgroundColor}
          />
        </Row>
        <Row>
          <ReasonPanel
            disabled={this.props.disabled}
            header="RSC"
            buttonNames={["INJ", "INJ BODY", "INJ HEAD", "CCTL", "OUTCLASS"]}
            reason={this.state.endFightReason}
            handleSelect={this.handleSelect}
            backgroundColor={this.props.secondaryBackgroundColor}
          />
        </Row>
        <Row>
          <ReasonPanel
            disabled={this.props.disabled}
            header=""
            buttonNames={["NOCONTEST", "RET", "WO"]}
            reason={this.state.endFightReason}
            handleSelect={this.handleSelect}
            backgroundColor={this.props.secondaryBackgroundColor}
          />
        </Row>
        <Button
          full
          disabled={this.props.disabled}
          light
          style={{ margin: 5 }}
          onPress={this.handlePress}>
          <H1>ACCEPT</H1>
        </Button>
      </Col>
    );
  }
}

export default PrematureEndPanel;
