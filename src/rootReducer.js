import { combineReducers } from 'redux';
// import userList from "./app/users/reducers/userList";
import login from "./app/login/reducers/login";

//define how the store is going to look like

const loginn = combineReducers({
    login
});

const rootReducer = combineReducers({
    loginn
});

export default rootReducer;