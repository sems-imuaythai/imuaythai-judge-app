import * as actionType from '../actions/types';

const websocketInitialState = {
    socket: null,
    connected: false,
    open: false
}
const websocket = (state = websocketInitialState, action) => {
    switch (action.type) {
        case actionType.WEBSOCKET_CONNECT:
            return {
                ...state,
                socket: action.payload,
                connected: true,
                open: true
            }
        case actionType.WEBSOCKET_SEND_MESSAGE:
            return {
                ...state,
                connected: true,
                open: true
            }
        case actionType.WEBSOCKET_RECEIVED_MESSAGE:
            return {
                ...state,
                connected: true,
                open: true
            }
        default:
            return state
    }
}

export default websocket;