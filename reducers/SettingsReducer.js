import * as actionType from '../actions/types';

const settingsInitialState = {
    ring: 'A'
}
const settings = (state = settingsInitialState, action) => {
    switch (action.type) {
        case actionType.SET_RING:
            return {
                ...state,
                ring: action.payload
            }
        default:
            return state
    }
}

export default settings;