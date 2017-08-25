import * as actionType from '../actions/types';

const reducerInitialState = {
    authToken: '',
    fetching: false,
    fetched: false,
    user: null
}
const reducer = (state = reducerInitialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_ACCOUNT_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case actionType.LOGIN_ACCOUNT_SUCCESS:
            return {
                ...state,
                authToken: action.payload.authToken,
                user: action.payload.user,
                fetching: false,
                fetched: true
            }
        case actionType.LOGIN_ACCOUNT_REJECTED:
            return {
                ...state,
                fetching: false,
            }
        case actionType.ACCOUNT_PREFIGHT_LOGOUT:
        case actionType.ACCOUNT_LOGOUT:
            return {
                ...state,
                authToken: '',
                user: null
            }
        default:
            return state
    }
}

export default reducer;