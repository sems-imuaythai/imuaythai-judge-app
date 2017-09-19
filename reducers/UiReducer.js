import * as actionTypes from "../actions/types";

const uiInitialState = {
  disabled: true
};
const ui = (state = uiInitialState, action) => {
  switch (action.type) {
    case actionTypes.BLOCK_UI:
      return {
        ...state,
        disabled: true
      };
    case actionTypes.UNBLOCK_UI:
      return {
        ...state,
        disabled: false
      };
    default:
      return state;
  }
};

export default ui;
