import * as actionTypes from "./types";
import axios from "axios";
import { unsubscribe } from "./WebsocketActions";
import { clearNotify, showError, showSuccess } from "./NotifyActions";
import { addToHistory } from "./PointHistoryActions";
import * as messageActions from "./MessageActions";
import Expo from "expo";

export const getFights = () => {
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

export const setWarning = warning => ({
  type: actionTypes.SET_WARNINGS,
  payload: warning
});

export const setFightId = id => {
  return dispatch => {
    dispatch(getFightDetails(id));

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
    const { role, points } = getState().Fight;
    dispatch({
      type: actionTypes.START_ROUND,
      payload: id
    });
    playSound();
    dispatch(stopBlinking());
    switch (role) {
      case "points":
        if (points.length > 0 && points.find(p => p.points > 0))
          dispatch(addToHistory());
        dispatch({
          type: actionTypes.RESET_POINTS
        });
        dispatch({
          type: actionTypes.UNBLOCK_POINTS
        });

        break;
      case "main":
        dispatch({
          type: actionTypes.CREATE_ROUND
        });
        dispatch({
          type: actionTypes.SET_ACTIVE_TIMER,
          payload: "fight"
        });
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
        dispatch({
          type: actionTypes.UNBLOCK_UI
        });
        break;
      case "timekeeper":
        dispatch({
          type: actionTypes.SET_ACTIVE_TIMER,
          payload: "fight"
        });
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
        break;
    }
  };
};

export const endRound = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    dispatch({
      type: actionTypes.END_ROUND
    });
    playSound();
    switch (role) {
      case "main":
      case "timekeeper":
        dispatch({
          type: actionTypes.SET_ACTIVE_TIMER,
          payload: "pause"
        });
        dispatch({
          type: actionTypes.START_PAUSE_TIMER
        });
        break;
      case "points":
        dispatch({
          type: actionTypes.START_BLINK
        });
        break;
      default:
        break;
    }
  };
};

export const setRoleInFight = () => {
  return (dispatch, getState) => {
    const { fight } = getState().Fight;
    const { user } = getState().Account;

    if (fight.timekeeper.id === user.id) {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "timekeeper"
      });
    } else if (
      fight.fightJudgesMappings.find(
        judge => judge.judge.id === user.id && judge.main === 1
      )
    ) {
      dispatch({
        type: actionTypes.SET_ROLE_IN_FIGHT,
        payload: "main"
      });
    } else if (
      fight.fightJudgesMappings.find(
        judge => judge.judge.id === user.id && judge.main === 0
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
    dispatch({
      type: actionTypes.PAUSE_ROUND
    });
    switch (role) {
      case "main":
      case "timekeeper":
        dispatch({
          type: actionTypes.STOP_FIGHT_TIMER
        });
    }
  };
};

export const resumeRound = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    dispatch({
      type: actionTypes.RESUME_ROUND
    });

    switch (role) {
      case "main":
      case "timekeeper":
        dispatch({
          type: actionTypes.START_FIGHT_TIMER
        });
    }
  };
};

export const endFight = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    dispatch(unsubscribe());
    switch (role) {
      case "main":
        dispatch({
          type: actionTypes.END_FIGHT
        });
        dispatch({
          type: actionTypes.EXIT_FIGHT
        });
        break;
      case "timekeeper":
      case "points":
        dispatch({
          type: actionTypes.END_FIGHT
        });
        dispatch({
          type: actionTypes.ACCOUNT_LOGOUT
        });
        break;
    }
  };
};

export const juryConnected = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;

    if (role === "points") return;

    dispatch({
      type: actionTypes.UNBLOCK_UI
    });
  };
};

export const acceptPoints = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    if (role === "timekeeper") return;

    dispatch({
      type: actionTypes.POINTS_ACCEPTED
    });
    dispatch(showSuccess("Points has been accepted!"));
  };
};

export const showPrematureEndPanels = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    if (role === "timekeeper") return;

    dispatch({
      type: actionTypes.SHOW_PREMATURE_END_PANELS
    });
    dispatch({
      type: actionTypes.STOP_FIGHT_TIMER
    });
  };
};
export const notifyJuryConnected = () => {
  return (dispatch, getState) => {
    const { role } = getState().Fight;
    if (role !== "main") return;

    dispatch(messageActions.juryConnected());
  };
};

export const setPoints = points => ({
  type: actionTypes.RECEIVED_POINTS,
  payload: points
});

export const timerButtonClick = () => {
  return (dispatch, getState) => {
    const { started, paused } = getState().Fight;
    if (started && paused) dispatch(messageActions.resumeRound());
    else if (started && !paused) dispatch(messageActions.pauseRound());
    else dispatch(messageActions.startRound());
  };
};

const playSound = async () => {
  await Expo.Audio.setIsEnabledAsync(true);
  const sound = new Expo.Audio.Sound();
  await sound.loadAsync(require("../assets/sounds/boxing_bell.mp3"));
  await sound.playAsync();
};

export const playPreSound = () => {
  return dispatch => {
    playPauseSound();
  };
};
const playPauseSound = async () => {
  await Expo.Audio.setIsEnabledAsync(true);
  const sound = new Expo.Audio.Sound();
  await sound.loadAsync(require("../assets/sounds/small_bell.mp3"));
  await sound.playAsync();
};

export const startBlinking = () => ({
  type: actionTypes.START_BLINK
});

export const stopBlinking = () => ({
  type: actionTypes.STOP_BLINK
});
