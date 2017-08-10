import { combineReducers } from "redux";
import Account from './AccountReducer';
import Fight from './FightReducer';
import Notify from './NotifyReducer';
import Websocket from './WebsocketReducer';


export default combineReducers({
    Account,
    Fight,
    Notify,
    Websocket
})