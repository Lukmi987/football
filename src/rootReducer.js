import { combineReducers } from "redux";
import events from "./app/event/reducers/events";
import createEvent from "./app/event/reducers/createEvent";
import eventStatus from "./app/event/reducers/eventStatus";
import occurrences from "./app/event/reducers/occurrences";
import login from "./app/login/reducers/login";
import logout from "./app/login/reducers/logout";
import profileUrl from "./app/userAccount/reducers/profileUrl";
import user from "./app/userAccount/reducers/storeUser";
import occurrencesWithUsers from "./app/event/reducers/occurrencesWithUsers";
import manageToken from "./app/manageToken/reducers/setTokenStatus";
import usersProfiles from "./app/event/reducers/usersProfiles"

//define how the store is going to look like

const loginn = combineReducers({
  login,
});

const rootReducer = combineReducers({
  login,
  logout,
  events,
  occurrences,
  profileUrl,
  user,
  occurrencesWithUsers,
  eventStatus,
  manageToken,
  usersProfiles
});

export default rootReducer;
