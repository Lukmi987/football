import {
    LOG_USER_OUT,
    LOGIN_USER
} from '../../constants/actionTypes'

export const processLoginForm = (user) => ({
    type: LOGIN_USER,
    user,
});

export const logOut = () => ({
    type: LOG_USER_OUT
});






