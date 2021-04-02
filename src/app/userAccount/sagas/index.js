import { takeLatest } from 'redux-saga/effects';
import {storeProfileImg} from "./storeProfileImg";
import {storeUser} from "./storeUser"

//listen for CHANGE_COUNTER
const userAccountSagas = [
    takeLatest('STORE_PROFILE_IMG_URL_SAGA', storeProfileImg),
    takeLatest('STORE_USER_SAGA', storeUser),
  ];

export default userAccountSagas;