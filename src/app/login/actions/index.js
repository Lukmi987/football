import {
    DELETE_AUTH_INFO,
    LOG_USER_OUT,
    LOGIN_USER
} from '../../constants/actionTypes'

export const processLoginForm = (user) => ({
    type: LOGIN_USER,
    user,
});

export const logOut = (action) => ({
    type: DELETE_AUTH_INFO,
    data: action.data,
});






