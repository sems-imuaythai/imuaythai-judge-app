import * as actionTypes from './types';
import { websocket } from '../common/globalVariables';

const constructUrl = (ring) => {
    switch (ring) {
        case "A":
            return websocket + "/ringa";
        case "B":
            return websocket + "/ringb";
        case "C":
            return websocket + "/ringc";
        default:
            return websocket + "/ringa";
    }
}

export const subscribe = () => {
    return (dispatch, getState) => {
        //const {ring} = getState().Settings;

        var socket = new WebSocket(websocket + "ringa");
        socket.onmessage = (event) => {
            dispatch({
                type: actionTypes.WEBSOCKET_CLEAR_MESSAGE
            });
            
            dispatch({
                type: actionTypes.WEBSOCKET_RECEIVED_MESSAGE,
                payload: event.data
            });
        }

        dispatch({
            type: actionTypes.WEBSOCKET_CONNECT,
            payload: socket
        })
    }
}

export const sendMessage = (message) => {
    return (dispatch, getState) => {

        const {socket} = getState().Websocket;
        dispatch({
            type: actionTypes.WEBSOCKET_SEND_MESSAGE,
            payload: message
        })

        socket.send(message);


    }
}

export const unsubscribe = () => {
    return (dispatch, getState) => {
        const {socket} = getState().Websocket;

        socket.close();
        dispatch({
            type: actionTypes.WEBSOCKET_DISCONNECT
        })
    }
}