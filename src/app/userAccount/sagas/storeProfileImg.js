import { put,select } from 'redux-saga/effects';
import axios from "../../axios-football";

export function* storeProfileImg(action) {
    const { profileUrl } = action;
    const userToken = localStorage.token;
    console.log('my url saga', profileUrl);
    try {
        const responseUsers = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);
        const findUser = (user) => user.userID === '5wiVxV3Ag7S5K2bcmFVHLgvBrA12'
        const index = responseUsers.data.findIndex(findUser);
        console.log('users v saga profile', responseUsers, index);
    } catch (e) {
        console.log(e)
    }
}