import {
  DELETE_AUTH_INFO,
  LOG_USER_OUT,
  LOGIN_USER,
  SET_AUTH_INFO,
} from '../../constants/actionTypes';

export const processLoginForm = (user) => ({
  type: LOGIN_USER,
  user,
});

export const logOut = () => ({
  type: SET_AUTH_INFO,
  data: { idToken: null, userId: null },
});
