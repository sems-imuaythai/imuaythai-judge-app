import React, { Component } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  Label,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Title,
  Body,
  Left,
  Right,
  Picker,
  Footer,
  FooterTab,
  Badge
} from "native-base";

import { saveState, loadState } from "../../common/localStorage";
import { AsyncStorage } from "react-native";
const Item = Picker.Item;

const setConnectionMessage = props => {
  const { fetched, fetching } = props;
  if (fetching)
    return (
      <FooterTab
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text style={{ color: "gold" }}>Connecting...</Text>
      </FooterTab>
    );
  else if (fetched)
    return (
      <FooterTab
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text style={{ color: "green" }}>Connected to server</Text>
      </FooterTab>
    );
  else
    return (
      <FooterTab
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text style={{ color: "red" }}>Failed to connect to server</Text>
      </FooterTab>
    );
};

class SettingsView extends Component {
  componentWillMount() {
    AsyncStorage.getItem("Settings").then(settingsStr => {
      const parsedState = JSON.parse(settingsStr);
      this.props.setHostUrl(parsedState.host);
      this.props.setWebsocketUrl(parsedState.websocket);
      if (this.props.contests.length === 0) this.props.getContests();
    });
  }

  render() {
    const contests = this.props.contests.map((contest, key) => (
      <Item key={key} label={contest.name} value={contest} />
    ));
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <FormItem floatingLabel>
              <Label>Host Url</Label>
              <Input
                value={this.props.host}
                onChangeText={this.props.setHostUrl}
              />
            </FormItem>
            <FormItem floatingLabel>
              <Label>Websocket Url</Label>
              <Input
                value={this.props.websocket}
                onChangeText={this.props.setWebsocketUrl}
              />
            </FormItem>
            <Picker
              last
              mode="dropdown"
              placeholder="Select contest"
              selectedValue={this.props.contest}
              onValueChange={this.props.setContest}>
              {contests}
            </Picker>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.props.getContests}>
              <Text>Check connection</Text>
            </Button>
          </FooterTab>
          {setConnectionMessage(this.props)}
        </Footer>
      </Container>
    );
  }
}

export default SettingsView;
