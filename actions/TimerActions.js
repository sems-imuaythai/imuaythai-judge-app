import * as actionType from "./types";
import * as messageActions from "./MessageActions";

export const startFightTimer = () => ({
  type: actionType.START_FIGHT_TIMER
});
export const stopFightTimer = () => ({
  type: actionType.STOP_FIGHT_TIMER
});
export const resetFightTimer = () => ({
  type: actionType.RESET_FIGHT_TIMER
});
export const setCallbackFightTimer = callback => ({
  type: actionType.SET_CALLBACK_FIGHT_TIMER,
  payload: callback
});

export const startPauseTimer = () => ({
  type: actionType.START_PAUSE_TIMER
});
export const stopPauseTimer = () => ({
  type: actionType.STOP_PAUSE_TIMER
});
export const resetPauseTimer = () => ({
  type: actionType.RESET_PAUSE_TIMER
});
export const setCallbackPauseTimer = callback => ({
  type: actionType.SET_CALLBACK_PAUSE_TIMER,
  payload: callback
});

export const setActiveTimer = timer => ({
  type: actionType.SET_ACTIVE_TIMER,
  payload: timer
});

export const fightCallback = () => {
  return dispatch => {
    dispatch(messageActions.endRound());
  };
};
export const pauseCallback = () => {
  return dispatch => {
    dispatch({
      type: actionType.SET_ACTIVE_TIMER,
      payload: "fight"
    });
  };
};
