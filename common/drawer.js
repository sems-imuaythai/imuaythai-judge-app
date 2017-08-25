import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Drawer } from 'native-base';
import NavigationBar from 'react-native-navbar';

export default class MyDrawer extends Component {

    constructor() {
        super();
        this.state = {
            toggled: false
        }
    }


    toggleDrawer() {
        this.state.toggled ? this._drawer.close() : this._drawer.open();
    }


    closeDrawer() {
        this.setState({
            toggled: false
        });
    };


    openDrawer() {
        this.setState({
            toggled: true
        });
    };

    renderScene(route, navigator) {
        switch (route) {
            default: {
                return null;
            }
        }
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight
    }

    render() {

        return (
            <Drawer type="displace" ref={ (ref) => {
                                  this._drawer = ref;
                              } } content={ this.props.content } onClose={ this.closeDrawer.bind(this) } onOpen={ this.openDrawer.bind(this) } openDrawerOffset={ 0.2 }
              panOpenMask={ 0.10 } captureGestures="open">
              <Navigator ref={ (ref) => this._navigator = ref } configureScene={ this.configureScene.bind(this) } renderScene={ (route, navigator) => this.props.children } />
            </Drawer>
            );
    }

}