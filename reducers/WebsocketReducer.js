import * as actionType from "../actions/types";

const websocketInitialState = {
  socket: null,
  connected: false,
  juryConnected: false,
  open: false,
  message: ""
};
const websocket = (state = websocketInitialState, action) => {
  switch (action.type) {
    case actionType.WEBSOCKET_CONNECT:
      return {
        ...state,
        socket: action.payload,
        connected: true,
        open: true
      };
    case actionType.WEBSOCKET_JURY_CONNECT:
      return {
        ...state,
        juryConnected: true
      };
    case actionType.WEBSOCKET_SEND_MESSAGE:
      return {
        ...state,
        connected: true,
        open: true
      };
    case actionType.WEBSOCKET_RECEIVED_MESSAGE:
      return {
        ...state,
        connected: true,
        open: true,
        message: action.payload
      };
    case actionType.WEBSOCKET_DISCONNECT:
      return {
        ...state,
        connected: false,
        open: false,
        juryConnected: false,
        socket: null
      };
    case actionType.WEBSOCKET_CLEAR_MESSAGE:
      return {
        ...state,
        message: ""
      };
    default:
      return state;
  }
};

export default websocket;
