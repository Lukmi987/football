import { combineReducers } from 'redux';
import userList from "./app/users/reducers/userList";

//define how the store is going to look like

const users = combineReducers({
    userList
});

const rootReducer = combineReducers({
    users
});

export default rootReducer;