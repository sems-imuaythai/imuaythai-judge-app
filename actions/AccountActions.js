import * as actionTypes from './types';
import axios from 'axios';
import { host } from '../common/globalVariables';

export const loginAccount = (credentials) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN_ACCOUNT_REQUEST
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
            })


    }
}