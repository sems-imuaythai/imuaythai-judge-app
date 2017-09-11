import * as actionType from "../actions/types";

const settingsInitialState = {
  ring: "A",
  host: "https://imuaythai.herokuapp.com/",
  websocket: "wss://imuaythai.herokuapp.com/",
  contest: null,
  contests: []
};
const settings = (state = settingsInitialState, action) => {
  switch (action.type) {
    case actionType.SET_RING:
      return {
        ...state,
        ring: action.payload
      };

    case actionType.SET_HOST_URL:
      return {
        ...state,
        host: action.payload
      };
    case actionType.SET_WEBSOCKET_URL:
      return {
        ...state,
        websocket: action.payload
      };
    case actionType.GET_CONTESTS_REQUEST:
      return state;
    case actionType.GET_CONTESTS_SUCCESS:
      return {
        ...state,
        contests: action.payload
      };
    case actionType.SET_CONTEST:
      return {
        ...state,
        contest: action.payload
      };

    default:
      return state;
  }
};

export default settings;
