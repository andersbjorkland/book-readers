import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";

export default createStore(rootReducer, applyMiddleware(thunk));