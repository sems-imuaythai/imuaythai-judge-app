import React, { Component } from 'react';
import LoginContainer from '../Login/LoginContainer';
import DashboardView from '../../components/Dashboard/DashboardView'
import { Root, Toast } from "native-base";
import { StackNavigator } from "react-navigation";
import FightPointView from '../../components/Fight/FightPointsView'
import { connect } from 'react-redux';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import FightListContainer from '../Fight/FightListContainer';

class MainContainer extends Component {
    render() {

        return (<FightListContainer/>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: state.Account.authToken,
        error: state.Notify.errorMessage
    }
}

MainContainer = connect(mapStateToProps)(MainContainer);
/*MainContainer = StackNavigator({
    Login: {
        screen: LoginContainer
    },
    FightList: {
        screen: FightListContainer
    }
});*/
export default MainContainer;