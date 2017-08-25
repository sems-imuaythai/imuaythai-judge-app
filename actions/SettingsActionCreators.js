import * as actionType from './types';

export const setRing = (ring) => ({
    type: actionType.SET_RING,
    payload: ring

})

export const setHostUrl = (url) => ({
    type: actionType.SET_HOST_URL,
    payload: url
})


export const setWebsocketUrl = (url) => ({
    type: actionType.SET_WEBSOCKET_URL,
    payload: url
})