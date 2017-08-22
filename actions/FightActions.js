import * as actionTypes from './types';
import axios from 'axios';
import { host } from '../common/globalVariables';

export const getFights = (ring) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_FIGHTS_REQUEST
        })
        return axios
            .get(host + "api/fight/get/" + ring)
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

export const getFightDetails = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_FIGHT_DETAILS_REQUEST
        })
        return axios
            .get(host + "api/fight/" + id)
            .then((response) => {
                dispatch({
                    type: actionTypes.GET_FIGHT_DETAILS_SUCCESS,
                    payload: response.data
                }),
                (err) => {
                    dispatch({
                        type: actionTypes.GET_FIGHT_DETAILS_REJECTED
                    })
                    dispatch({
                        type: actionTypes.SHOW_ERROR,
                        payload: err.response != null
                            ? err.response.data
                            : "Cannot connect to server"
                    })
                }
            })

    }
}

export const setFightId = (id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_FIGHT_ID,
            payload: id
        })
    }
}