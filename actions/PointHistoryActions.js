import * as actionType from "./types";
import { addPointsToHistory } from "./PointActions";

export const addToHistory = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionType.ADD_POINTS_HISTORY,
      payload: addPointsToHistory(getState())
    });
  };
  dispatch({
    type: actionType.RESET_POINTS
  });
};
