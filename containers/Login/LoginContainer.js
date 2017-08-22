import React, { Component } from 'react';
import LoginView from '../../components/Login/LoginView';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import { loginAccount, loginWithQRCode } from '../../actions/AccountActions';
import CenterSpinner from '../../components/Spinner/CenterSpinner';
import { Permissions } from 'expo';

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

            <LoginView handleSubmit={ this.props.handleSubmit } fetching={ this.props.fetching } hasCameraPermission={ hasCameraPermission } loginWithQRCode={ this.props.loginWithQRCode } />
            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: state.Account.authToken,
        fetching: state.Account.fetching,
        fetched: state.Account.fetched,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: (credentials) => {
            dispatch(loginAccount(credentials))
        },
        loginWithQRCode: (qrcode) => {
            dispatch(loginWithQRCode(qrcode))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)