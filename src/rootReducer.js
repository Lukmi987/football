import { combineReducers } from 'redux';
import events from './app/event/reducers/events';
import createEvent from './app/event/reducers/createEvent';
import eventStatus from './app/event/reducers/eventStatus';
import occurrences from './app/event/reducers/occurrences';
import login from './app/login/reducers/login';
import logout from './app/login/reducers/logout';
import user from './app/userAccount/reducers/storeUser';
import occurrencesWithUsers from './app/event/reducers/occurrencesWithUsers';
import manageToken from './app/manageToken/reducers/setTokenStatus';
import usersProfiles from './app/event/reducers/usersProfiles';
import eventNews from './app/event/reducers/eventNews';

//define how the store is going to look like

const loginn = combineReducers({
  login,
});

const rootReducer = combineReducers({
  login,
  logout,
  events,
  occurrences,
  user,
  occurrencesWithUsers,
  eventStatus,
  manageToken,
  usersProfiles,
  eventNews,
});

export default rootReducer;
