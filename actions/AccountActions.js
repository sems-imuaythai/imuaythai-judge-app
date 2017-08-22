import * as actionTypes from './types';
import axios from 'axios';
import { host } from '../common/globalVariables';
import { unsubscribe } from './WebsocketActions';

export const loginAccount = (credentials) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN_ACCOUNT_REQUEST
        });
        dispatch({
            type: actionTypes.RESET_NOTIFY
        });

        return axios
            .post(host + "api/account/login", credentials)
            .then((response) => {
                dispatch({
                    type: actionTypes.LOGIN_ACCOUNT_SUCCESS,
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.LOGIN_ACCOUNT_REJECTED,
                    payload: err.response != null
                        ? err.response.data
                        : "Cannot connect to server"
                })
                dispatch({
                    type: actionTypes.SHOW_ERROR,
                    payload: err.response != null
                        ? err.response.data
                        : "Cannot connect to server"
                })
            })
    }
}

export const loginWithQRCode = (qrcode) => {
    let data = JSON.parse(qrcode.data);
    return dispatch => {
        dispatch({
            type: actionTypes.LOGIN_ACCOUNT_SUCCESS,
            payload: data
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(unsubscribe())
        dispatch({
            type: actionTypes.ACCOUNT_LOGOUT
        })
    }
}