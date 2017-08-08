import React, { Component } from 'react';
import LoginContainer from '../Login/LoginContainer';
import DashboardView from '../../components/Dashboard/DashboardView'
import { Root, Toast } from "native-base";
import { StackNavigator } from "react-navigation";

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            showToast: false
        }
    }
    render() {
        const ToastNotifier = () => Toast.show({
            text: 'Wrong password!',
            position: 'bottom',
            buttonText: 'Okay',
            type: "danger"
        })
        return (<DashboardView/>);
    }
}
const AppNavigator = StackNavigator(
    {
        Page: {
            screen: MainContainer
        },
    }
);

MainContainer = () => <Root>
                        <AppNavigator />
                      </Root>;

export default MainContainer;