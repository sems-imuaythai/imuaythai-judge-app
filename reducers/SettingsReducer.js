import * as actionType from '../actions/types';

const settingsInitialState = {
    ring: 'A',
    host: 'https://imuaythai.herokuapp.com/',
    websocket: 'wss://imuaythai.herokuapp.com/'
}
const settings = (state = settingsInitialState, action) => {
    switch (action.type) {
        case actionType.SET_RING:
            return {
                ...state,
                ring: action.payload
            }

        case actionType.SET_HOST_URL:
            return {
                ...state,
                host: action.payload,
            }
        case actionType.SET_WEBSOCKET_URL:
            return {
                ...state,
                websocket: action.payload
            }
        default:
            return state
    }
}

export default settings;