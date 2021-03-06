import * as actionType from "../actions/types";

const settingsInitialState = {
  ring: "A",
  host: "https://imuaythai-api.herokuapp.com/",
  websocket: "wss://imuaythai-api.herokuapp.com/",
  contest: null,
  contests: [],
  fetching: false,
  fetched: false
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
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    case actionType.GET_CONTESTS_SUCCESS:
      return {
        ...state,
        contests: action.payload,
        contest: action.payload[0],
        fetched: true,
        fetching: false
      };
    case actionType.GET_CONTESTS_REJECTED:
      return {
        ...state,
        fetching: false
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
