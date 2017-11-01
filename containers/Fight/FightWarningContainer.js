import { connect } from "react-redux";
import FightWarnings from "../../components/Fight/FightWarnings";

const mapStateToProps = (state, ownProps) => {
  return {
    rounds: state.Fight.rounds,
    fight: state.Fight.fight
  };
};

export default connect(mapStateToProps)(FightWarnings);
