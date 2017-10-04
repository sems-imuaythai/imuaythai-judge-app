import * as requestTypes from "../common/requestTypes";
import { sendMessage } from "./WebsocketActions";
import { strigifyMessage } from "../common/messageHandler";
import * as actionType from "./types";
import { modelPointsToBeAccepted, modelPointsToBeSend } from "./PointActions";

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
  return dispatch => {
    const message = {
      requestType: requestTypes.EndFight,
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
      requestType: requestTypes.AcceptPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};

export const sendPoints = fighterId => {
  return (dispatch, getState) => {
    const points = modelPointsToBeSend(fighterId, getState());
    const message = {
      requestType: requestTypes.SendPoints,
      data: points
    };
    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
    dispatch({
      type: actionType.BLOCK_UI
    });
  };
};

export const startRound = () => {
  return dispatch => {
    console.log("start round");
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
