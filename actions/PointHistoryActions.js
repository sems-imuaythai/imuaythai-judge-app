import * as actionType from './types'

export const addToHistory = (points) => ({
    type: actionType.ADD_POINTS_HISTORY,
    payload: points

})