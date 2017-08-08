import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Form, Item, Input, Title, Body, Toast } from 'native-base';

class DashboardView extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Dashboard</Title>
          </Body>
        </Header>
        <Content>
          <Body>
            <Text>Text text text</Text>
          </Body>
        </Content>
      </Container>
      );
  }
}

export default DashboardView;