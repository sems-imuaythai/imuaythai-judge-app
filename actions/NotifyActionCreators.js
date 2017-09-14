import * as actionTypes from "./types";

export const showError = errorMessage => ({
  type: actionTypes.SHOW_ERROR,
  payload: errorMessage
});

export const showSuccess = successMessage => ({
  type: actionTypes.SHOW_SUCCESS,
  payload: successMessage
});

export const clearNotify = () => ({
  type: actionTypes.RESET_NOTIFY
});
