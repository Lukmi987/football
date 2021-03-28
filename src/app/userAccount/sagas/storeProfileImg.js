import { put,select } from 'redux-saga/effects';
import axios from "../../axios-football";

export function* storeProfileImg(action) {
    const { profileUrl } = action;
    const userToken = localStorage.token;
    console.log('my url saga', profileUrl);
    try {
        const responseUsers = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);
        console.log('users v saga profile', responseUsers);
    } catch (e) {
        console.log(e)
    }
}