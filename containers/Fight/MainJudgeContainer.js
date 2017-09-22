import React, { Component } from "react";
import { connect } from "react-redux";
import FightMainJudgeView from "../../components/Fight/FightMainJudgeView";
import MyDrawer from "../../common/drawer";
import FightListContainer from "./FightListContainer";
import FightPrematureEndPanels from "../../components/Fight/FightPrematureEndPanels";
import * as messageActions from "../../actions/MessageActions";
import { editPoints } from "../../actions/PointActions";
import { bindActionCreators } from "redux";

const MainJudgeContainer = props => {
  if (props.showPrematureEndPanels)
    return <FightPrematureEndPanels {...props} />;
  else
    return (
      <MyDrawer content={<FightListContainer isSidebar={true} />}>
        <FightMainJudgeView {...props} />
      </MyDrawer>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    juryConnected: state.Websocket.juryConnected,
    fight: state.Fight.fight,
    user: state.Account.user,
    disabled: state.Ui.disabled
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    Object.assign({}, messageActions, { editPoints }),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MainJudgeContainer);
