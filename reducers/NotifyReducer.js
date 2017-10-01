import * as actionType from "../actions/types";

const notifyInitialState = {
  errorMessage: "",
  successMessage: "",
  warningMessage: ""
};
const notify = (state = notifyInitialState, action) => {
  switch (action.type) {
    case actionType.SHOW_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case actionType.SHOW_SUCCESS:
      return {
        ...state,
        successMessage: action.payload
      };
    case actionType.SHOW_WARNING:
      return {
        ...state,
        warningMessage: action.payload
      };
    case actionType.RESET_NOTIFY:
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
        warningMessage: ""
      };
    default:
      return state;
  }
};

export default notify;
