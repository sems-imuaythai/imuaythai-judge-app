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
        let error =
          err.response != null ? err.response.data : "Cannot connect to server";
        dispatch(showError(error));
      });
  };
};

export const getFightDetails = id => {
  return (dispatch, getState) => {
    const { host } = getState().Settings;
    const { fightId } = getState().Fight;

    if (fightId === id) return;
    dispatch({
      type: actionTypes.GET_FIGHT_DETAILS_REQUEST
    });
    return axios.get(host + "api/fight/" + id).then(response => {
      dispatch({
        type: actionTypes.GET_FIGHT_DETAILS_SUCCESS,
        payload: response.data
      }),
        dispatch(setRoleInFight());
      err => {
        dispatch({
          type: actionTypes.GET_FIGHT_DETAILS_REJECTED
        });
        let error =
          err.response != null ? err.response.data : "Cannot connect to server";
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
    dispatch(getFightDetails(id));
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
      case "points":
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

export const setRoleInFight = () => {
  return (dispatch, getState) => {
    const { fight } = getState().Fight;
    const { user } = getState().Account;

    if (fight.timeKeeperId === user.id) {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "timekeeper"
      });
    } else if (
      fight.fightJudgesMappings.find(
        judge => judge.judgeId === user.id && judge.main === 1
      )
    ) {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "main"
      });
    } else if (
      fight.fightJudgesMappings.find(
        judge => judge.judgeId === user.id && judge.main === 0
      )
    ) {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "points"
      });
    } else {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "no role"
      });
    }
  };
};

export const pauseRound = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    switch (role) {
      case "main":
      case "timekeeper":
        dispatch({
          type: actionTypes.STOP_FIGHT_TIMER
        });
    }
    dispatch({
      type: actionTypes.PAUSE_ROUND
    });
  };
};

export const resumeRound = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    switch (role) {
      case "main":
      case "timekeeper":
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
    }
    dispatch({
      type: actionTypes.RESUME_ROUND
    });
  };
};

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
