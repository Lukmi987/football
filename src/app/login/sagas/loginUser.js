import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import {SET_AUTH_INFO} from "../../constants/actionTypes";

export function* loginUser(action) {
    const { email, pwd } = action.user;
    const preparedData = {email, password: pwd, returnSecureToken: true };

    // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHgyJbZWnZHfyECzhyd8ncmPNWevtSDJg';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
    // if (!isSignup) {
    //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHgyJbZWnZHfyECzhyd8ncmPNWevtSDJg';
    // }
    try {
        const response = yield axios.post(url,preparedData);
        console.log('v login user', response);
        // const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
        //new Date without args give us current date,
        // localStorage.setItem('token', response.data.idToken);
        // yield put({type: SET_AUTH_INFO, loginAuthInfo});
        //yield put({type: });
    } catch (e) {
        console.log(e);
        // yield put({type: SET_AUTH_INFO, errorObject});
    }
}

