import { combineReducers } from "redux";
import Account from './AccountReducer';
import Fight from './FightReducer';
import Notify from './NotifyReducer';
import Websocket from './WebsocketReducer';
import Settings from './SettingsReducer';
import PointsHistory from './PointsHistoryReducer';


export default combineReducers({
    Account,
    Fight,
    Notify,
    Settings,
    Websocket,
    PointsHistory
})