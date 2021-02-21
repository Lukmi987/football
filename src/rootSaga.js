import { all } from 'redux-saga/effects';
import usersSagas from "./app/users/sagas";
import counterSagas from "./app/login/sagas";

export default function* rootSaga() {
    yield all([
      ...usersSagas,
      ...counterSagas
    ]);
  }