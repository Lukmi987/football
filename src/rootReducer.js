import { combineReducers } from "redux";
import event from "./app/event/reducers/event";
import login from "./app/login/reducers/login";

//define how the store is going to look like

const loginn = combineReducers({
  login,
});

const rootReducer = combineReducers({
  login,
  event,
});

export default rootReducer;
