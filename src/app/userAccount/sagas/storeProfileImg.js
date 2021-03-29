import { put,select } from 'redux-saga/effects';
import axios from "../../axios-football";
import {SET_EVENT, STORE_PROFILE_IMG_URL} from "../../constants/actionTypes";

export function* storeProfileImg(action) {
    console.log('hello ....................................111');
    const { profileUrl } = action;
    const userToken = localStorage.token;

    console.log('hello ....................................');
    try {
        const userId = yield select(state => state.login.userId);
        const responseUsers = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);
        const findUser = (user) => user.userID === userId;
        const index = responseUsers.data.findIndex(findUser);
        responseUsers.data[index].profileUrl = profileUrl;
         const updatedUsers =  yield axios.put(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`, responseUsers.data);
        console.log('my url saga', profileUrl);
        if(profileUrl) {
            yield put({ type: STORE_PROFILE_IMG_URL, data: profileUrl });
        }
    } catch (e) {
        console.log(e)
    }
}