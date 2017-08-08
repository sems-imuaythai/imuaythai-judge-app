import React, { Component } from 'react';
import LoginView from '../../components/Login/LoginView';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import { loginAccount } from '../../actions/AccountActions';

class LoginContainer extends Component {


    render() {
        if (this.props.fetching)
            return (<Spinner/>)
        else
            return (
                <LoginView handleSubmit={ this.props.handleSubmit } />
                );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: state.Account.authToken,
        fetching: state.Account.fetching,
        fetched: state.Account.fetched,
        error: state.Account.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit: (credentials) => {
            dispatch(loginAccount(credentials))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)