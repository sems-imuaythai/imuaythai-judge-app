import * as actionType from '../actions/types';

const pointsHistoryInitialState = {
    rounds: []
}
const pointsHistory = (state = pointsHistoryInitialState, action) => {
    switch (action.type) {
        case actionType.ADD_POINTS_HISTORY:
            return {
                ...state,
                rounds: state.rounds.concat([action.payload])
            }
        case actionType.ACCOUNT_LOGOUT:
            return {
                ...state,
                rounds: []
            }
        default:
            return state
    }
}

export default pointsHistory;