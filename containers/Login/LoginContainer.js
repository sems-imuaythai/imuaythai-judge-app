import React, { Component } from 'react';
import LoginView from '../../components/Login/LoginView';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import { loginAccount, loginWithQRCode } from '../../actions/AccountActions';
import { setRing } from '../../actions/SettingsActionCreators';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import MyDrawer from '../../common/drawer';
import SettingsContainer from '../Settings/SettingsContainer';

class LoginContainer extends Component {
    constructor() {
        super();

        this.state = {
            showQR: false,
            data: null,
            hasCameraPermission: null
        }
    }

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    render() {
        const {hasCameraPermission} = this.state;
        return (
            <MyDrawer content={ <SettingsContainer /> }>
              <LoginView handleSubmit={ this.props.loginAccount } fetching={ this.props.fetching } hasCameraPermission={ hasCameraPermission } loginWithQRCode={ this.props.loginWithQRCode } setRing={ this.props.setRing }
                ring={ this.props.ring } />
            </MyDrawer>


            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: state.Account.authToken,
        fetching: state.Account.fetching,
        fetched: state.Account.fetched,
        ring: state.Settings.ring
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(Object.assign({}, {
        loginAccount
    }, {
        loginWithQRCode
    }, {
        setRing
    }), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)