import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Button
} from "native-base";
import CenterSpinner from "../Spinner/CenterSpinner";

const FightListView = props => {
  const renderFightList = props.fights
    .sort((a, b) => {
      return a.startNumber - b.startNumber;
    })
    .map((fight, key) => (
      <ListItem
        key={key}
        button
        onPress={
          props.setFightId && !props.isSidebar
            ? () => props.setFightId(fight.id)
            : () => {}
        }>
        <Text>
          {fight.redAthlete.firstName +
            " " +
            fight.redAthlete.surname +
            " vs " +
            fight.blueAthlete.firstName +
            " " +
            fight.blueAthlete.surname +
            " #" +
            fight.startNumber}
        </Text>
      </ListItem>
    ));

  return (
    <Container>
      {props.isSidebar ? null : (
        <Header>
          <Left>
            <Button transparent onPress={props.logout}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Fights list</Title>
          </Body>
          <Right />
        </Header>
      )}
      <Content>
        {props.fetching ? <CenterSpinner /> : <List>{renderFightList}</List>}
      </Content>
    </Container>
  );
};

export default FightListView;
