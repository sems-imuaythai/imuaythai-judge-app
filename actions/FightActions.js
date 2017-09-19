import * as actionTypes from "./types";
import axios from "axios";
import { unsubscribe } from "./WebsocketActions";
import { clearNotify, showError } from "./NotifyActionCreators";
import Expo from "expo";

export const getFights = ring => {
  return (dispatch, getState) => {
    const { ring, host, contest } = getState().Settings;
    dispatch({
      type: actionTypes.GET_FIGHTS_REQUEST
    });
    return axios
      .get(host + "api/fight/get/" + contest.id + "/" + ring)
      .then(response => {
        dispatch({
          type: actionTypes.GET_FIGHTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.GET_FIGHTS_REJECTED
        });
        dispatch(clearNotify());
        let error =
          err.response != null ? err.response.data : "Cannot connect to server";
        dispatch(showError(error));
      });
  };
};

export const getFightDetails = id => {
  return (dispatch, getState) => {
    const { host } = getState().Settings;
    dispatch({
      type: actionTypes.GET_FIGHT_DETAILS_REQUEST
    });
    return axios.get(host + "api/fight/" + id).then(response => {
      dispatch({
        type: actionTypes.GET_FIGHT_DETAILS_SUCCESS,
        payload: response.data
      }),
        err => {
          dispatch({
            type: actionTypes.GET_FIGHT_DETAILS_REJECTED
          });
          dispatch(clearNotify());
          let error =
            err.response != null
              ? err.response.data
              : "Cannot connect to server";
          dispatch(showError(error));
        };
    });
  };
};

export const setFightId = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_FIGHT_ID,
      payload: id
    });
  };
};

export const exitFight = () => {
  return dispatch => {
    dispatch(unsubscribe());
    dispatch({
      type: actionTypes.EXIT_FIGHT
    });
  };
};

export const startRound = id => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;

    switch (role) {
      case "point":
        dispatch({
          type: actionTypes.UNBLOCK_UI
        });
        break;
      case "main":
        dispatch({
          type: actionTypes.CREATE_ROUND,
          payload: id
        });
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
        break;
      case "timekeeper":
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
        break;
    }

    dispatch({
      type: actionTypes.START_ROUND
    });
  };
};

export const endRound = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
  };
};

export const pauseRound = () => {};

export const resumeRound = () => {};

export const endFight = () => {};

export const juryConnected = () => {};

export const acceptPoints = () => {};

export const showPrematureEndPanels = () => {};

export const timerButtonClick = () => {
  return (dispatch, getState) => {};
};

const playSound = async () => {
  await Expo.Audio.setIsEnabledAsync(true);
  const sound = new Expo.Audio.Sound();
  await sound.loadAsync(require("../../sounds/boxing_bell.mp3"));
  await sound.playAsync();
};
