import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  DELETE_AUTH_INFO,
  FETCH_OCCURRENCES,
  LOG_USER_OUT,
  SET_AUTH_INFO,
  SET_TOKEN_STATUS,
} from '../../constants/actionTypes';

const delay = (ms) => new Promise(response => setTimeout(response, ms))
export function* loginUser(action) {
    const { email, pwd, isSignup } = action.user;
    const preparedData = {email, password: pwd, returnSecureToken: true };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
    if (!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
    }
    try {
        const response = yield axios.post(url,preparedData);
        console.log('v login userAccount', response);
        const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };

        console.log('login saga !!!!!!!!!1',response.data.expiresIn * 1000);
         const  expTime = response.data.expiresIn * 1000;
        localStorage.setItem('token', response.data.idToken);
         localStorage.setItem('expTime',expTime.toString());
         localStorage.setItem('refreshToken', response.data.refreshToken);
         localStorage.setItem('userId',response.data.localId);
         const tokenCreatedTime = new Date().getTime().toString();
         localStorage.setItem('tokenCreatedTime',tokenCreatedTime);
          yield put({type: SET_TOKEN_STATUS, data: {deleted: false}});

        // oddelat stav budu brat z local storage, vsuse kde pouzivam z redaxu predelat
          yield put({type: SET_AUTH_INFO, data: loginAuthInfo});
        yield delay(10000);
        yield put({type: SET_AUTH_INFO, data:{idToken: null, userId: null}});
    } catch (e) {
        const errorMsg = {
            idToken: null,
            userId: null,
            errorMsg: e.response?.data?.error?.message
        };
        yield put({type: SET_AUTH_INFO, data: errorMsg});
    }
}

