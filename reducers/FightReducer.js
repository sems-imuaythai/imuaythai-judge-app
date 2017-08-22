import * as actionType from '../actions/types';

const fightInitialState = {
    fightList: [],
    fetching: false,
    fetched: false,
    fight: undefined,
    fightId: ''
}


const fight = (state = fightInitialState, action) => {
    switch (action.type) {
        case actionType.GET_FIGHTS_REQUEST:
        case actionType.GET_FIGHT_DETAILS_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        case actionType.GET_FIGHTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                fightList: action.payload
            }
        case actionType.GET_FIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                fight: action.payload
            }
        case actionType.GET_FIGHTS_REJECTED:
        case actionType.GET_FIGHT_DETAILS_REJECTED:
            return {
                ...state,
                fetching: false
            }

        case actionType.SET_FIGHT_ID:
            return {
                ...state,
                fightId: action.payload
            }
            case actionType.ACCOUNT_LOGOUT:
            return {
                ...state,
                fight: undefined,
                fightId: ''
            }
        default:
            return state
    }
}

export default fight;