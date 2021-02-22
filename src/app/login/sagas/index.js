import { takeLatest } from 'redux-saga/effects';
import { LOGIN_USER } from "../../constants/actionTypes";
import { loginUser } from "./loginUser";

const counterSagas = [
    takeLatest(LOGIN_USER, loginUser),
  ];

export default counterSagas;