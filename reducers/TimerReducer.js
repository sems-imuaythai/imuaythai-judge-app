import * as actionType from "../actions/types";

const timerInitialState = {
  pauseTimerStart: false,
  pauseTimerReset: false,
  pauseTimerCallback: undefined,
  fightTimerStart: false,
  fightTimerReset: false,
  fightTimerCallback: undefined,
  active: "fight"
};
const timer = (state = timerInitialState, action) => {
  switch (action.type) {
    case actionType.START_FIGHT_TIMER:
      return {
        ...state,
        fightTimerStart: true,
        fightTimerReset: false
      };
    case actionType.STOP_FIGHT_TIMER:
      return {
        ...state,
        fightTimerStart: false
      };
    case actionType.RESET_FIGHT_TIMER:
      return {
        ...state,
        fightTimerStart: false,
        fightTimerReset: true
      };
    case actionType.SET_CALLBACK_FIGHT_TIMER:
      return {
        ...state,
        fightTimerCallback: action.payload
      };
    case actionType.START_PAUSE_TIMER:
      return {
        ...state,
        pauseTimerStart: true,
        pauseTimerReset: false
      };
    case actionType.STOP_PAUSE_TIMER:
      return {
        ...state,
        pauseTimerStart: false
      };
    case actionType.RESET_PAUSE_TIMER:
      return {
        ...state,
        pauseTimerStart: false,
        pauseTimerReset: true
      };
    case actionType.SET_CALLBACK_PAUSE_TIMER:
      return {
        ...state,
        pauseTimerCallback: action.payload
      };
    case actionType.SET_ACTIVE_TIMER:
      return {
        ...state,
        active: action.payload,
        pauseTimerStart: false,
        fightTimerStart: false
      };
    default:
      return state;
  }
};

export default timer;
