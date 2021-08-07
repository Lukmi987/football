import axios from '../../axios-football';
import { put } from 'redux-saga/effects';
import { SET_ADMIN } from '../../constants/actionTypes';

export function* getAdmin() {
  const userToken = localStorage.token;
  const userId = localStorage.userId;
  try {
    const { data } = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);
    const user = data.find(user => user.userID === userId);
    if(user){
      yield put({type: SET_ADMIN ,data: {isAdmin: user.isAdmin}});
    }

  } catch (e) {
    console.log('error z get admin saga',e);
  }
}