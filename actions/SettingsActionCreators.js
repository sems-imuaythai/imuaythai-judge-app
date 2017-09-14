import * as actionType from "./types";
import axios from "axios";
import { clearNotify, showError } from "./NotifyActionCreators";

export const setRing = ring => ({
  type: actionType.SET_RING,
  payload: ring
});

export const setHostUrl = url => ({
  type: actionType.SET_HOST_URL,
  payload: url
});

export const setWebsocketUrl = url => ({
  type: actionType.SET_WEBSOCKET_URL,
  payload: url
});

export const setContest = contest => ({
  type: actionType.SET_CONTEST,
  payload: contest
});

export const getContests = () => {
  return (dispatch, getState) => {
    const { host } = getState().Settings;
    dispatch({
      type: actionType.GET_CONTESTS_REQUEST
    });
    return axios
      .get(host + "api/contests")
      .then(response => {
        dispatch({
          type: actionType.GET_CONTESTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionType.GET_CONTESTS_REJECTED
        });
        dispatch(clearNotify());
        let error =
          err.response != null ? err.response.data : "Cannot connect to server";
        dispatch(showError(error));
      });
  };
};
