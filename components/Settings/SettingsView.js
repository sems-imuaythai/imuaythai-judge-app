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
  Picker
} from "native-base";

const Item = Picker.Item;

class SettingsView extends Component {
  componentWillMount() {
    if (this.props.contests.length === 0) this.props.getContests();
  }

  render() {
    console.log(this.props.contests);
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
      </Container>
    );
  }
}

export default SettingsView;
