import React, { Component } from "react";
import FightListView from "../../components/Fight/FightListView";
import { prefightLogout } from "../../actions/AccountActions";
import { getFights, setFightId } from "../../actions/FightActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class FightListContaier extends Component {
  componentWillMount() {
    this.props.getFights();
  }
  render() {
    return (
      <FightListView
        fights={this.props.fights}
        fetching={this.props.fetching}
        setFightId={this.props.setFightId}
        isSidebar={this.props.isSidebar}
        logout={this.props.prefightLogout}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    fights: state.Fight.fightList,
    fetching: state.Fight.fetching,
    isSidebar: ownProps.isSidebar
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    Object.assign({}, { getFights }, { setFightId }, { prefightLogout }),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FightListContaier);
