import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input, Title, Body, Left, Right } from 'native-base';
import { Image } from 'react-native';
import CenterSpinner from '../Spinner/CenterSpinner';

class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>
              Login
            </Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Image style={ { width: null, height: 200 } } source={ { uri: 'http://www.downwithdesign.com/wp-content/uploads/2012/07/dark-knight-rises-logo.png' } } />
          { this.props.fetching ?
            <CenterSpinner/> :
            <Form>
              <Item>
                <Input placeholder="Username" keyboardType="email-address" onChangeText={ (text) => this.setState({
                                                                                            email: text
                                                                                          }) } />
              </Item>
              <Item last>
                <Input placeholder="Password" secureTextEntry={ true } onChangeText={ (text) => this.setState({
                                                                                        password: text
                                                                                      }) } />
              </Item>
              <Button block primary onPress={ () => this.props.handleSubmit(this.state) }>
                <Text>
                  Log in
                </Text>
              </Button>
              <Button block success>
                <Text>
                  Scan QR code
                </Text>
              </Button>
            </Form> }
        </Content>
      </Container>
      );
  }
}

export default LoginView;