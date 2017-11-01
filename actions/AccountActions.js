import * as actionTypes from "./types";
import axios from "axios";
import { unsubscribe } from "./WebsocketActions";
import { clearNotify, showError } from "./NotifyActions";

export const loginAccount = credentials => {
  return (dispatch, getState) => {
    const { host } = getState().Settings;
    dispatch({
      type: actionTypes.LOGIN_ACCOUNT_REQUEST
    });

    return axios
      .post(host + "api/account/login", credentials)
      .then(response => {
        dispatch({
          type: actionTypes.LOGIN_ACCOUNT_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.LOGIN_ACCOUNT_REJECTED,
          payload:
            err.response != null
              ? err.response.data
              : "Cannot connect to server"
        });
        dispatch(clearNotify());
        let error =
          err.response != null ? err.response.data : "Cannot connect to server";
        dispatch(showError(error));
      });
  };
};

export const loginWithQRCode = qrcode => {
  let data = JSON.parse(qrcode.data);
  return dispatch => {
    dispatch({
      type: actionTypes.LOGIN_ACCOUNT_SUCCESS,
      payload: data
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(unsubscribe());
    dispatch({
      type: actionTypes.ACCOUNT_LOGOUT
    });
  };
};

export const prefightLogout = () => ({
  type: actionTypes.ACCOUNT_PREFIGHT_LOGOUT
});
