import { takeLatest } from 'redux-saga/effects';
import { storeUser } from './storeUser';
import { getAdmin } from './getAdmin';
import { GET_ADMIN } from '../../constants/actionTypes';

//listen for CHANGE_COUNTER
const userAccountSagas = [
  takeLatest('STORE_USER_SAGA', storeUser),
  takeLatest(GET_ADMIN, getAdmin)
];

export default userAccountSagas;
