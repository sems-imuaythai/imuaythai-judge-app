import * as actionType from '../actions/types';

const reducerInitialState = {
    authToken: '',
    fetching: false,
    fetched: false,
    error: undefined
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
                authToken: action.payload,
                fetching: false,
                fetched: true
            }
        case actionType.LOGIN_ACCOUNT_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;