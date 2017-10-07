import React from "react";
import FightPointsView from "../../components/Fight/FightPointsView";
import { addToHistory } from "../../actions/PointHistoryActions";
import { sendPoints, sendInjury } from "../../actions/MessageActions";
import { setWarning } from "../../actions/FightActions";
import { connect } from "react-redux";
import FightPrematureEndPanels from "../../components/Fight/FightPrematureEndPanels";
import MyDrawer from "../../common/drawer";
import FightPointsHistoryContainer from "./FightPointsHistoryContainer";
import { bindActionCreators } from "redux";

const FightPointsContainer = props => {
  if (props.showPrematureEndPanels)
    return <FightPrematureEndPanels {...props} />;
  else
    return (
      <MyDrawer content={<FightPointsHistoryContainer />}>
        <FightPointsView {...props} />
      </MyDrawer>
    );
};

const mapStateToProps = state => {
  return {
    fight: state.Fight.fight,
    points: state.Fight.points,
    disabled: state.Ui.disabled,
    showPrematureEndPanels: state.Ui.showPrematureEndPanels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendPoints(fighterId) {
      dispatch(sendPoints(fighterId));
    },
    setWarnings(warning) {
      dispatch(setWarning(warning));
    },
    addToHistory(points) {
      dispatch(addToHistory(points));
    },
    sendInjury(injury) {
      dispatch(sendInjury(injury));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  FightPointsContainer
);
