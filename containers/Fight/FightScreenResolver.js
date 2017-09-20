import React, { Component } from "react";
import { connect } from "react-redux";
import { subscribe } from "../../actions/WebsocketActions";
import { showWarning } from "../../actions/NotifyActionCreators";
import FightPointsContainer from "./FightPointsContainer";
import MainJudgeContainer from "./MainJudgeContainer";
import TimekeeperContainer from "./TimekeeperContainer";
import FightListContainer from "./FightListContainer";
import CenterSpinner from "../../components/Spinner/CenterSpinner";

class FightScreenResolver extends Component {
  render() {
    if (role) {
      switch (role) {
        case "main":
          this.props.subscribe();
          return <MainJudgeContainer />;
        case "points":
          this.props.subscribe();
          return <FightPointsContainer />;
        case "timekeeper":
          this.props.subscribe();
          return <TimekeeperContainer />;
        default:
          this.props.showWarning("You don't have any role in this fight");
          return <FightListContainer />;
      }
    }

    return <CenterSpinner />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    role: state.Fight.role
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subscribe: () => {
      dispatch(subscribe());
    },

    showWarning: message => {
      dispatch(showWarning(message));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  FightScreenResolver
);
