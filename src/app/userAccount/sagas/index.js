import { takeLatest } from 'redux-saga/effects';
import { storeUser } from './storeUser';

//listen for CHANGE_COUNTER
const userAccountSagas = [
  takeLatest('STORE_USER_SAGA', storeUser),
];

export default userAccountSagas;
