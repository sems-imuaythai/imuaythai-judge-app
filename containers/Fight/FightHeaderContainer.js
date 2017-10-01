import { connect } from "react-redux";
import FightHeader from "../../components/Fight/FightHeader";

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

export default connect(mapStateToProps)(FightHeader);
