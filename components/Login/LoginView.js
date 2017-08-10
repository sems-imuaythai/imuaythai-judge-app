import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input, Title, Body } from 'native-base';
import { Image } from 'react-native';

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
        <Content style={ { marginTop: 10 } }>
          <Image style={ { width: null, height: 200 } } source={ { uri: 'http://www.downwithdesign.com/wp-content/uploads/2012/07/dark-knight-rises-logo.png' } } />
          <Form>
            <Item>
              <Input placeholder="Username" onChangeText={ (text) => this.setState({
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
          </Form>
        </Content>
      </Container>
      );
  }
}

export default LoginView;