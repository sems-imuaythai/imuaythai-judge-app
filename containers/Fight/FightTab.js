import React, { Component } from "react";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import FightWarningContainer from "./FightWarningContainer";
import FightListContainer from "./FightListContainer";
class FightTab extends Component {
  render() {
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab heading="Fight list">
            <FightListContainer isSidebar={true} />
          </Tab>
          <Tab heading="Fight warnings">
            <FightWarningContainer />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default FightTab;
