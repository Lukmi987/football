import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  DELETE_AUTH_INFO,
  FETCH_OCCURRENCES,
  LOG_USER_OUT,
  SET_AUTH_INFO,
} from '../../constants/actionTypes';
// import {useDispatch} from "react-redux";
// const dispatch = useDispatch();

const delay = (ms) => new Promise((response) => setTimeout(response, ms));
export function* loginUser(action) {
  const { email, pwd, isSignup } = action.user;
  const preparedData = { email, password: pwd, returnSecureToken: true };

  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
  if (!isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
  }
  try {
    const response = yield axios.post(url, preparedData);
    console.log('v login userAccount', response);
    const loginAuthInfo = { idToken: response.data.idToken, userId: response.data.localId };
    localStorage.setItem('token', response.data.idToken);
    // function x(){
    //     dispatch({type: DELETE_AUTH_INFO, data:{token: null, userId: null}});
    // }

    console.log('se');
    yield put({ type: SET_AUTH_INFO, data: loginAuthInfo });
    // yield put({type: FETCH_OCCURRENCES}); it call action, depands on the type, if type defined in reducer it cal reducer
    yield delay(2000);
    yield put({ type: SET_AUTH_INFO, data: { idToken: null, userId: null } });
  } catch (e) {
    const errorMsg = {
      idToken: null,
      userId: null,
      errorMsg: e.response?.data?.error?.message,
    };
    yield put({ type: SET_AUTH_INFO, data: errorMsg });
  }
}
