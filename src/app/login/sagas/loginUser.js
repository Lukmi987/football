import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import {SET_AUTH_INFO} from "../../constants/actionTypes";

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
         localStorage.setItem('token', response.data.idToken);
          yield put({type: SET_AUTH_INFO, data: loginAuthInfo});
    } catch (e) {
        const errorMsg = {
            idToken: null,
            userId: null,
            errorMsg: e.response?.data?.error?.message
        };
        yield put({type: SET_AUTH_INFO, data: errorMsg});
    }
}

