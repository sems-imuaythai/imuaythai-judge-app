import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers/CombinedReducer";

const middleware = [thunk, logger];
export default createStore(reducer, {}, applyMiddleware(...middleware));
