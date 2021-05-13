import { combineReducers } from "redux";
import articleReducer from "./articles/";
import authReducer from "./auth";
import alertReducer from "./alert";

const rootReducer = combineReducers({
  articles: articleReducer,
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
