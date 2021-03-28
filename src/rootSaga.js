import { all } from "redux-saga/effects";
import loginSagas from "./app/login/sagas";
import eventSagas from "./app/event/sagas";
import userAccountSagas from "./app/userAccount/sagas";

export default function* rootSaga() {
  yield all([...loginSagas, ...eventSagas, ...userAccountSagas]);
}
