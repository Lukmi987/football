import { put,select } from 'redux-saga/effects';
import axios from "../../axios-football";
import {STORE_USER} from "../../constants/actionTypes";

export function* storeUser(action) {
    const { nickname, bday, aboutMe } = action.user;
    // console.log('................',action.user);
    const userToken = localStorage.token;
    try {
        const userId = yield select(state => state.login.userId);
        const responseUsers = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);
        const findUser = (user) => user.userID === userId;
        const index = responseUsers.data.findIndex(findUser);
        responseUsers.data[index].nickname = nickname;
        responseUsers.data[index].age = bday;
        responseUsers.data[index].aboutMe = aboutMe;
        console.log('rjfkj ',responseUsers.data);
         const updatedUsers =  yield axios.put(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`, responseUsers.data);
            yield put({ type: STORE_USER, data: action.user });

    } catch (e) {
        console.log(e)
    }
}