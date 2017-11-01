import React, { Component } from "react";
import { connect } from "react-redux";
import FightMainJudgeView from "../../components/Fight/FightMainJudgeView";
import MyDrawer from "../../common/drawer";
import FightListContainer from "./FightListContainer";
import FightTab from "./FightTab";
import FightPrematureEndPanels from "../../components/Fight/FightPrematureEndPanels";
import * as messageActions from "../../actions/MessageActions";
import { editPoints } from "../../actions/PointActions";
import { bindActionCreators } from "redux";

const MainJudgeContainer = props => {
  if (props.showPrematureEndPanels)
    return <FightPrematureEndPanels {...props} isAdmin={true} />;
  else
    return (
      <MyDrawer content={<FightTab />}>
        <FightMainJudgeView {...props} />
      </MyDrawer>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    juryConnected: state.Websocket.juryConnected,
    fight: state.Fight.fight,
    user: state.Account.user,
    rounds: state.Fight.rounds,
    disabled: state.Ui.disabled,
    showPrematureEndPanels: state.Ui.showPrematureEndPanels
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    Object.assign({}, messageActions, { editPoints }),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MainJudgeContainer);
