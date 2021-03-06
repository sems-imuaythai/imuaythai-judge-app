import * as actionTypes from "./types";
import { showSuccess, showError, clearNotify } from "./NotifyActions";
import { handleMessage } from "../common/messageHandler";

const constructUrl = (ring, websocket) => {
  switch (ring) {
    case "A":
      return websocket + "ringa";
    case "B":
      return websocket + "ringb";
    case "C":
      return websocket + "ringc";
    default:
      return websocket + "ringa";
  }
};

export const notifyJuryConnected = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.WEBSOCKET_JURY_CONNECT
    });
  };
};

export const subscribe = () => {
  return (dispatch, getState) => {
    const { ring, websocket } = getState().Settings;

    let url = constructUrl(ring, websocket);
    let socket = new WebSocket(url);

    socket.onmessage = event => {
      dispatch({
        type: actionTypes.WEBSOCKET_CLEAR_MESSAGE
      });

      dispatch({
        type: actionTypes.WEBSOCKET_RECEIVED_MESSAGE,
        payload: event.data
      });

      handleMessage(event.data, dispatch);
    };

    socket.onerror = error => {
      dispatch(showError(error));
    };

    dispatch({
      type: actionTypes.WEBSOCKET_CONNECT,
      payload: socket
    });
    dispatch(showSuccess("Connected to fight"));
  };
};

export const sendMessage = message => {
  return (dispatch, getState) => {
    const { socket } = getState().Websocket;
    dispatch({
      type: actionTypes.WEBSOCKET_SEND_MESSAGE,
      payload: message
    });

    socket.send(message);
  };
};

export const unsubscribe = () => {
  return (dispatch, getState) => {
    const { socket } = getState().Websocket;
    if (!socket) return;
    socket.close();
    dispatch({
      type: actionTypes.WEBSOCKET_DISCONNECT
    });
  };
};

export const clearMessage = () => ({
  type: actionTypes.WEBSOCKET_CLEAR_MESSAGE
});
