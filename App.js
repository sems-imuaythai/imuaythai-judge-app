import React from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input } from 'native-base'
import { Font, AppLoading } from 'expo'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false
    }
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({
      ready: true
    })
  }

  render() {
    if (this.state.ready)
      return (
        <Container>
          <Header/>
          <Content>
            <Form>
              <Item>
                <Input placeholder="E-mail" />
              </Item>
              <Item last>
                <Input placeholder="Password" />
              </Item>
              <Button>
                <Text>
                  Log in
                </Text>
              </Button>
            </Form>
          </Content>
        </Container>
        );
    else
      return <AppLoading />;
  }
}
