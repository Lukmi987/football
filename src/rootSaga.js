import { all } from 'redux-saga/effects';
import loginSagas from "./app/login/sagas";

export default function* rootSaga() {
    yield all([
      ...loginSagas
    ]);
  }