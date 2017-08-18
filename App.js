import React from 'react';
import { Font, AppLoading } from 'expo';
import { Provider } from "react-redux";
import store from "./store/store";
import MainContainer from './containers/Main/MainContainer'


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false
        }
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require("native-base/Fonts/Ionicons.ttf")
        });

        this.setState({
            ready: true
        })
    }

    render() {

        if (this.state.ready)
            return (
                <Provider store={ store }>
                  <MainContainer/>
                </Provider>
                );
        else
            return <AppLoading />;
    }
}
