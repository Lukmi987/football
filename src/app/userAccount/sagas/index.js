import { takeLatest } from 'redux-saga/effects';
import {storeProfileImg} from "./storeProfileImg";

// const storeProfileImg = () => {1};

//listen for CHANGE_COUNTER
const userAccountSagas = [
    takeLatest('STORE_PROFILE_IMG_URL_SAGA', storeProfileImg),
  ];

export default userAccountSagas;