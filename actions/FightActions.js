import * as actionTypes from './types';
import axios from 'axios';
import { host } from '../common/globalVariables';

export const getFights = (ring) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_FIGHTS_REQUEST
        })

        return axios
            .get(host + "api/fight", ring)
            .then((response) => {
                dispatch({
                    type: actionTypes.GET_FIGHTS_SUCCESS,
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.GET_FIGHTS_REJECTED
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