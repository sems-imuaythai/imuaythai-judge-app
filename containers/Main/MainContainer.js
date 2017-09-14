import React, { Component } from "react";
import LoginContainer from "../Login/LoginContainer";
import DashboardView from "../../components/Dashboard/DashboardView";
import { Root, Toast } from "native-base";
import { StackNavigator } from "react-navigation";
import FightPointView from "../../components/Fight/FightPointsView";
import { connect } from "react-redux";
import CenterSpinner from "../../components/Spinner/CenterSpinner";
import FightListContainer from "../Fight/FightListContainer";
import FightScreenResolver from "../Fight/FightScreenResolver";
import MainJudgeContainer from "../Fight/MainJudgeContainer";
import { saveState } from "../../common/localStorage";

const renderToast = (message, type) => {
  Toast.show({
    text: message,
    position: "bottom",
    buttonText: "Okay",
    type: type
  });
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }

  componentDidUpdate() {
    if (this.props.error != "") renderToast(this.props.error, "danger");
    if (this.props.success != "") renderToast(this.props.success, "success");
    if (this.props.warning != "") renderToast(this.props.warning, "warning");
  }

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  render() {
    if (this.props.account.authToken != "" && this.props.fightId == "")
      return <FightListContainer />;
    else if (this.props.account.user != null && this.props.fightId != "")
      return <FightScreenResolver fightId={this.props.fightId} />;
    else return <LoginContainer />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.Account,
    error: state.Notify.errorMessage,
    success: state.Notify.successMessage,
    warning: state.Notify.warningMessage,
    fightId: state.Fight.fightId
  };
};

MainContainer = connect(mapStateToProps)(MainContainer);
AppNavigator = StackNavigator({
  Main: {
    screen: MainContainer
  }
});

var MainContainerWithNavigator = () => (
  <Root>
    <AppNavigator />
  </Root>
);
export default MainContainerWithNavigator;
