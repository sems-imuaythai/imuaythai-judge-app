import * as actionTypes from './types';
import { websocket } from '../common/globalVariables';

const constructUrl = (ring) => {
    switch (ring) {
        case "A":
            return websocket + "/ringa";
        case "B":
            return websocket + "/ringb";
        case "C":
            return websocket + "/ringc"
    }
}

export const subscribe = (ring) => {
    return (dispatch) => {
        var socket = new WebSocket(websocket + "/ringa");

        socket.onmessage = (event) => {
            dispatch({
                type: actionTypes.WEBSOCKET_RECEIVED_MESSAGE,
                payload: event.data
            });
        }
    }
}

export const sendMessage = (socket, message) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.WEBSOCKET_SEND_MESSAGE,
            payload: message
        })

        socket.send(message);


    }
}