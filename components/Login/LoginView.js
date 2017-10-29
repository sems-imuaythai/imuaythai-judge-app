import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
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
import { Image, StyleSheet } from "react-native";
import CenterSpinner from "../Spinner/CenterSpinner";
import { BarCodeScanner } from "expo";
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;

class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showQRScanner: false
    };
  }

  handleQRPress() {
    this.setState({
      showQRScanner: true
    });
  }

  render() {
    if (this.state.showQRScanner)
      return (
        <Container>
          <BarCodeScanner
            onBarCodeRead={this.props.loginWithQRCode}
            style={StyleSheet.absoluteFill}
          />
          <Button
            block
            light
            style={{ position: "absolute", bottom: 0, width: "100%" }}
            onPress={() =>
              this.setState({
                showQRScanner: false
              })}>
            <Text>Cancel</Text>
          </Button>
        </Container>
      );
    else
      return (
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Login</Title>
            </Body>
            <Right />
          </Header>
          <Content style={{ backgroundColor: "#fff" }}>
            <Image
              style={{ width: null, height: 400 }}
              source={require("../../mainLogo.png")}
            />
            {this.props.fetching ? (
              <CenterSpinner />
            ) : (
              <Form>
                <FormItem>
                  <Input
                    placeholder="Username"
                    keyboardType="email-address"
                    onChangeText={text =>
                      this.setState({
                        email: text
                      })}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text =>
                      this.setState({
                        password: text
                      })}
                  />
                </FormItem>
                <Picker
                  last
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.props.ring}
                  onValueChange={this.props.setRing}>
                  <Item label="Ring A" value="A" />
                  <Item label="Ring B" value="B" />
                  <Item label="Ring C" value="C" />
                </Picker>
                <Button
                  block
                  primary
                  onPress={() =>
                    this.props.handleSubmit({
                      email: this.state.email,
                      password: this.state.password
                    })}>
                  <Text>Log in</Text>
                </Button>
                <Button
                  block
                  success
                  disabled={!this.props.hasCameraPermission}
                  onPress={this.handleQRPress.bind(this)}>
                  <Text>Scan QR code</Text>
                </Button>
              </Form>
            )}
          </Content>
        </Container>
      );
  }
}

export default LoginView;
