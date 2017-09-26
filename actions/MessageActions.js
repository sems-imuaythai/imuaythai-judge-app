import * as requestTypes from "../common/requestTypes";
import { sendMessage } from "./WebsocketActions";
import { strigifyMessage } from "../common/messageHandler";
import { modelPointsToBeAccepted, modelPointsToBeSend } from "./PointActions";

export const showPrematuredPanels = () => {
  return dispatch => {
    const message = {
      type: requestTypes.ShowPrematureEndPanel,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const endFight = () => {
  return dispatch => {
    const message = {
      type: requestTypes.EndFight,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const acceptPoints = () => {
  return (dispatch, getState) => {
    const points = modelPointsToBeAccepted(getState());
    const message = {
      type: requestTypes.AcceptPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const sendPoints = () => {
  return (dispatch, getState) => {
    const points = modelPointsToBeSend(getState());
    const message = {
      type: requestTypes.SendPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const startRound = () => {
  return dispatch => {
    const message = {
      type: requestTypes.StartRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const endRound = () => {
  return dispatch => {
    const message = {
      type: requestTypes.EndRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const pauseRound = () => {
  return dispatch => {
    const message = {
      type: requestTypes.PauseRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const resumeRound = () => {
  return dispatch => {
    const message = {
      type: requestTypes.ResumeRound,
      data: null
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};
