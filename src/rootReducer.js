import { combineReducers } from "redux";
import events from "./app/event/reducers/events";
import occurrences from "./app/event/reducers/occurrences";
import login from "./app/login/reducers/login";

//define how the store is going to look like

const loginn = combineReducers({
  login,
});

const rootReducer = combineReducers({
  login,
  events,
  occurrences,
});

export default rootReducer;
