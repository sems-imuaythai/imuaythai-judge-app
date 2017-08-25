import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Label, Button, Text, Form, Item as FormItem, Input, Title, Body, Left, Right, Picker } from 'native-base';

class SettingsView extends Component {
    render() {
        return (
            <Container>
              <Header>
                <Left/>
                <Body>
                  <Title>Settings</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <Form>
                  <FormItem floatingLabel>
                    <Label>Host Url</Label>
                    <Input value={ this.props.host } onChangeText={ this.props.setHostUrl } />
                  </FormItem>
                  <FormItem floatingLabel last>
                    <Label>Websocket Url</Label>
                    <Input value={ this.props.websocket } onChangeText={ this.props.setWebsocketUrl } />
                  </FormItem>
                </Form>
              </Content>
            </Container>
            );
    }
}

export default SettingsView;