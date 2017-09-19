import * as actions from "../actions/FightActions";
import * as requestTypes from "./requestTypes";

export const handleMessage = (message, dispatch) => {
  switch (message.requestType) {
    case requestTypes.StartRound:
      dispatch(actions.startRound(message.data));
      break;
    case requestTypes.EndRound:
      dispatch(actions.endRound());
      break;
    case requestTypes.ResumeRound:
      dispatch(actions.resumeRound());
      break;
    case requestTypes.PauseRound:
      dispatch(actions.pauseRound());
      break;
    case requestTypes.EndFight:
      dispatch(actions.endFight());
      break;
    case requestTypes.JuryConnected:
      dispatch(actions.juryConnected());
      break;
    case requestTypes.AcceptPoints:
      dispatch(actions.acceptPoints());
      break;
    case requestTypes.ShowPrematureEndPanel:
      dispatch(actions.showPrematureEndPanels());
      break;

    default:
      break;
  }
};

export const parseMessage = message => {
  let responseData = null;
  let response = JSON.parse(message);

  try {
    responseData = JSON.parse(response.data);
  } catch (err) {
    responseData = response.data;
  }

  response.data = responseData;

  return response;
};
