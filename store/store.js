import { applyMiddleware, createStore } from "redux";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers/CombinedReducer";

const middleware = [thunk];
export default createStore(reducer, {}, applyMiddleware(...middleware));
