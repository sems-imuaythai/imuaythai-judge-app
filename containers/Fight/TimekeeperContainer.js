import { connect } from "react-redux";
import React, { Component } from "react";
import FightTimekeeperView from "../../components/Fight/FightTimekeeperView";
import { timerButtonClick } from "../../actions/FightActions";

const mapStateToProps = (state, ownProps) => {
  return {
    disabled: state.Ui.disabled,
    timer: state.Timer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    timerButtonClick() {
      dispatch(timerButtonClick());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FightTimekeeperView
);
