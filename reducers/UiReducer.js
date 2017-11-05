import * as actionTypes from "../actions/types";

const uiInitialState = {
  disabled: true,
  showPrematureEndPanels: false
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
    case actionTypes.SHOW_PREMATURE_END_PANELS:
      return {
        ...state,
        showPrematureEndPanels: true,
        disabled: false
      };

    case actionTypes.ACCOUNT_LOGOUT:
    case actionTypes.EXIT_FIGHT:
      return uiInitialState;
    default:
      return state;
  }
};

export default ui;
