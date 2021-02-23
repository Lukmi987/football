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
        console.log('v login user', response);
        const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
        //new Date without args give us current date,
         localStorage.setItem('token', response.data.idToken);
        // yield put({type: SET_AUTH_INFO, loginAuthInfo});
        //yield put({type: });
    } catch (e) {
        //if error execute authFail func
        console.log(e);
        // yield put({type: SET_AUTH_INFO, errorObject});
    }
}

