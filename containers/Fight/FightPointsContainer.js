import React, { Component } from "react";
import FightPointsView from "../../components/Fight/FightPointsView";
import * as requestType from "../../containers/Fight/requestTypes";
import { logout } from "../../actions/AccountActions";
import { connect } from "react-redux";
import { parseMessage } from "../../common/helpers";
import { clearMessage } from "../../actions/WebsocketActions";
import { addToHistory } from "../../actions/PointHistoryActions";
import FightPrematureEndPanels from "../../components/Fight/FightPrematureEndPanels";
import MyDrawer from "../../common/drawer";
import FightPointsHistoryContainer from "./FightPointsHistoryContainer";
import { bindActionCreators } from "redux";

class FightPointsContainer extends Component {
  constructor() {
    super();

    this.state = {
      showPrematureEndPanels: false,
      fightStarted: false,
      roundId: "",
      roundEndTime: 0,
      pauseRound: false
    };
  }
  togglePause() {
    this.setState(prevState => ({
      pauseRound: !prevState.pauseRound
    }));
  }

  showPanels() {
    this.setState({
      showPrematureEndPanels: true
    });
  }
  setRound(roundId) {
    this.setState(prevState => ({
      fightStarted: !prevState.fightStarted,
      roundId: roundId == null ? prevState.roundId : roundId
    }));
  }
  setRoundEndTime(time) {
    this.setState({
      roundEndTime: time
    });
  }

  render() {
    const parsedMessage = this.props.message
      ? parseMessage(this.props.message)
      : "";
    if (this.state.showPrematureEndPanels)
      return (
        <FightPrematureEndPanels
          fight={this.props.fight}
          user={this.props.user}
          sendMessage={this.props.sendMessage}
          fightStarted={this.state.fightStarted}
          roundId={this.state.roundId}
          logout={this.props.logout}
          sendMessage={this.props.sendMessage}
          message={parsedMessage}
          roundEndTime={this.state.roundEndTime}
        />
      );
    else
      return (
        <MyDrawer content={<FightPointsHistoryContainer />}>
          <FightPointsView
            fightStarted={this.state.fightStarted}
            fight={this.props.fight}
            user={this.props.user}
            message={parsedMessage}
            sendMessage={this.props.sendMessage}
            showPanels={this.showPanels.bind(this)}
            setRound={this.setRound.bind(this)}
            clearMessage={this.props.clearMessage}
            roundId={this.state.roundId}
            setRoundEndTime={this.setRoundEndTime.bind(this)}
            logout={this.props.logout}
            togglePause={this.togglePause.bind(this)}
            pauseRound={this.state.pauseRound}
            addToHistory={this.props.addToHistory}
          />
        </MyDrawer>
      );
  }
}

const mapStateToProps = state => {
  return {
    message: state.Websocket.message
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}, { logout }, { clearMessage }, { addToHistory }),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(
  FightPointsContainer
);
