import * as requestTypes from "../common/requestTypes";
import { sendMessage } from "./WebsocketActions";
import { strigifyMessage } from "../common/messageHandler";
import { preparePointsToSend } from "./PointActions";

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
    const points = preparePointsToSend(getState());

    const stringifiedMessage = strigifyMessage(message);
    dispatch(sendMessage(stringifiedMessage));
  };
};
