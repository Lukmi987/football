import { takeLatest } from 'redux-saga/effects';
import { LOGIN_USER, PROCESS_EVENT } from '../../constants/actionTypes';
import { loginUser } from "./loginUser";
import { processEvent } from "./processEvent";

const loginSagas = [
    takeLatest(LOGIN_USER, loginUser),
    takeLatest(PROCESS_EVENT, processEvent )
  ];

export default loginSagas;