import * as actionType from '../actions/types';

const fightInitialState = {
    fightList: [],
    fetching: false,
    fetched: false
}


const fight = (state = fightInitialState, action) => {
    switch (action.type) {
        case actionType.GET_FIGHTS_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        case actionType.GET_FIGHTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true
            }
        case actionType.GET_FIGHTS_REJECTED:
            return {
                ...state,
                fetching: false
            }
        default:
            return state
    }
}

export default fight;