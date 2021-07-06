import { put, select } from 'redux-saga/effects';
import axios from 'axios';



export function* createPlayer(payLoad) {
const {email, password, firstName, lastName, isAdmin } = payLoad.data;

  const preparedData = { email, password: password, returnSecureToken: true };
  // const preparedData = { email, password: pwd, returnSecureToken: true };
  // zaregistrovat usera
  const signUpUrl=
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';


  try {
     const resSingUp = yield axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg', preparedData );
     const userId = resSingUp.data.localId;
    console.log('hmmmmmmmmmmmmm userId', resSingUp);

    const userData = {nickname: '', bday:'', aboutMe: '', imageUrl:'', email, firstName, lastName, userId: userId, isAdmin: isAdmin}
    yield put({type: 'STORE_USER_SAGA', user:  userData})
  } catch (e) {

  }
}
