import * as requestTypes from "../common/requestTypes";
import { sendMessage } from "./WebsocketActions";
import { strigifyMessage } from "../common/messageHandler";
import { showError } from "./NotifyActions";
import * as actionType from "./types";
import {
  modelPointsToBeAccepted,
  modelPointsToBeSend,
  canSendPoints,
  prepareInjury
} from "./PointActions";

export const showPrematuredPanels = () => {
  return dispatch => {
    const message = {
      requestType: requestTypes.ShowPrematureEndPanel,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const endFight = () => {
  return (dispatch, getState) => {
    const { fightId } = getState().Fight;
    const message = {
      requestType: requestTypes.EndFight,
      data: fightId
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const acceptPoints = () => {
  return (dispatch, getState) => {
    const points = modelPointsToBeAccepted(getState());
    const message = {
      requestType: requestTypes.AcceptPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
    dispatch({
      type: actionType.BLOCK_UI
    });
  };
};

export const sendPoints = fighterId => {
  return (dispatch, getState) => {
    if (!canSendPoints(getState())) {
      dispatch(showError("At least one of the fighters must have 10 points"));
      return;
    }

    const points = modelPointsToBeSend(fighterId, getState());
    const message = {
      requestType: requestTypes.SendPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
    dispatch({
      type: actionType.BLOCK_POINTS,
      payload: fighterId
    });
  };
};

export const startRound = () => {
  return (dispatch, getState) => {
    if (!canStartNewRound(getState())) return;
    const message = {
      requestType: requestTypes.StartRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const endRound = () => {
  return dispatch => {
    const message = {
      requestType: requestTypes.EndRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const pauseRound = () => {
  return dispatch => {
    const message = {
      requestType: requestTypes.PauseRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const resumeRound = () => {
  return dispatch => {
    const message = {
      requestType: requestTypes.ResumeRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const juryConnected = () => {
  return dispatch => {
    const message = {
      requestType: requestTypes.JuryConnected,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const sendInjury = injury => {
  return (dispatch, getState) => {
    const message = {
      requestType: requestTypes.PrematureEnd,
      data: prepareInjury(injury, getState())
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
    dispatch({
      type: actionType.BLOCK_UI
    });
  };
};

const canStartNewRound = state => {
  const { fight, roundId } = state.Fight;
  return fight.structure.round.roundsCount > roundId;
};
