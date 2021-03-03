import { takeLatest } from "redux-saga/effects";
import { LOGIN_USER } from "../../constants/actionTypes";
import { loginUser } from "./loginUser";

const loginSagas = [takeLatest(LOGIN_USER, loginUser)];

export default loginSagas;
