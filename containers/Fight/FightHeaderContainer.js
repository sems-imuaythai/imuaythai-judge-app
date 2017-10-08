import { connect } from "react-redux";
import FightHeader from "../../components/Fight/FightHeader";
import { fightCallback, pauseCallback } from "../../actions/TimerActions";
import { playPreSound } from "../../actions/FightActions";
const mapStateToProps = (state, ownProps) => {
  return {
    timer: state.Timer,
    fight: state.Fight.fight,
    user: state.Account.user,
    started: state.Fight.started,
    paused: state.Fight.paused,
    showTimer: ownProps.showTimer
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fightTimerCallback: () => {
      dispatch(fightCallback());
    },
    pauseTimerCallback: () => {
      dispatch(pauseCallback());
    },
    playPreSound: () => {
      dispatch(playPreSound());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FightHeader);
