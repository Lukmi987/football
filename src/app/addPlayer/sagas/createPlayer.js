import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import { SET_LOADING_EVENT } from '../../constants/actionTypes';



export function* createPlayer(payLoad) {
const {email, password, firstName, lastName, isAdmin } = payLoad.data;
  yield put({ type: SET_LOADING_EVENT, data: { isLoading: true, success: false, error: false } });
  const preparedData = { email, password: password, returnSecureToken: true };
  // const preparedData = { email, password: pwd, returnSecureToken: true };
  // zaregistrovat usera
  const signUpUrl=
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';


  try {
     const resSingUp = yield axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg', preparedData );
     const userId = resSingUp.data.localId;
    console.log('hmmmmmmmmmmmsdmm userId', resSingUp);

    const userData = {nickname: '', bday:'', aboutMe: '', imageUrl:'', email, firstName, lastName, userId: userId, isAdmin: isAdmin}
    yield put({type: 'STORE_USER_SAGA', user:  userData})
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: true, error: false } });
  } catch (e) {
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: false, error: true } });
    console.log(e,'jsem v erorr');

  }
}
