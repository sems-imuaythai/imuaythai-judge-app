// account
export const LOGIN_ACCOUNT_REQUEST = "LOGIN_ACCOUNT_REQUEST";
export const LOGIN_ACCOUNT_SUCCESS = "LOGIN_ACCOUNT_SUCCESS";
export const LOGIN_ACCOUNT_REJECTED = "LOGIN_ACCOUNT_REJECTED";
export const ACCOUNT_LOGOUT = "ACCOUNT_LOGOUT";
export const ACCOUNT_PREFIGHT_LOGOUT = "ACCOUNT_PREFIGHT_LOGOUT";

//notify
export const SHOW_ERROR = "SHOW_ERROR";
export const SHOW_SUCCESS = "SHOW_SUCCESS";
export const SHOW_WARNING = "SHOW_WARNING";
export const RESET_NOTIFY = "RESET_NOTIFY";

//fight
export const GET_FIGHTS_REQUEST = "GET_FIGHTS_REQUEST";
export const GET_FIGHTS_SUCCESS = "GET_FIGHTS_SUCCESS";
export const GET_FIGHTS_REJECTED = "GET_FIGHTS_REJECTED";
export const GET_FIGHT_DETAILS_REQUEST = "GET_FIGHT_DETAILS_REQUEST";
export const GET_FIGHT_DETAILS_SUCCESS = "GET_FIGHT_DETAILS_SUCCESS";
export const GET_FIGHT_DETAILS_REJECTED = "GET_FIGHT_DETAILS_REJECTED";
export const SET_FIGHT_ID = "SET_FIGHT_ID";
export const EXIT_FIGHT = "EXIT_FIGHT";
export const SET_ROLE_IN_FIGHT = "SET_ROLE_IN_FIGHT";
export const START_ROUND = "START_ROUND";
export const END_ROUND = "END_ROUND";
export const PAUSE_ROUND = "PAUSE_ROUND";
export const RESUME_ROUND = "RESUME_ROUND";
export const CREATE_ROUND = "CREATE_ROUND";

//fight - points
export const EDIT_POINTS = "EDIT_POINTS";
export const RECEIVED_POINTS = "RECEIVED_POINTS";

//socket
export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const WEBSOCKET_JURY_CONNECT = "WEBSOCKET_JURY_CONNECT";
export const WEBSOCKET_SEND_MESSAGE = "WEBSOCKET_SEND_MESSAGE";
export const WEBSOCKET_RECEIVED_MESSAGE = "WEBSOCKET_RECEIVED_MESSAGE";
export const WEBSOCKET_DISCONNECT = "WEBSOCKET_DISCONNECT";
export const WEBSOCKET_CLEAR_MESSAGE = "WEBSOCKET_CLEAR_MESSAGE";

//points history
export const ADD_POINTS_HISTORY = "ADD_POINTS_HISTORY";
export const GET_POINTS_HISOTRY = "GET_POINTS_HISOTRY";

//settings
export const SET_RING = "SET_RING";
export const SET_HOST_URL = "SET_HOST_URL";
export const SET_WEBSOCKET_URL = "SET_WEBSOCKET_URL";
export const SET_CONTEST = "SET_CONTEST";
export const GET_CONTESTS_REQUEST = "GET_CONTESTS_REQUEST";
export const GET_CONTESTS_SUCCESS = "GET_CONTESTS_SUCCESS";
export const GET_CONTESTS_REJECTED = "GET_CONTESTS_REJECTED";

//timer
export const START_FIGHT_TIMER = "START_FIGHT_TIMER";
export const STOP_FIGHT_TIMER = "STOP_FIGHT_TIMER";
export const RESET_FIGHT_TIMER = "RESET_FIGHT_TIMER";
export const SET_CALLBACK_FIGHT_TIMER = "SET_CALLBACK_FIGHT_TIMER";
export const START_PAUSE_TIMER = "START_PAUSE_TIMER";
export const STOP_PAUSE_TIMER = "STOP_PAUSE_TIMER";
export const RESET_PAUSE_TIMER = "RESET_PAUSE_TIMER";
export const SET_CALLBACK_PAUSE_TIMER = "SET_CALLBACK_PAUSE_TIMER";
export const SET_ACTIVE_TIMER = "SET_ACTIVE_TIMER";

//ui
export const BLOCK_UI = "BLOCK_UI";
export const UNBLOCK_UI = "UNBLOCK_UI";
