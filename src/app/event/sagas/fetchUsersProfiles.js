import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_USERS_IDS, SET_USERS_PROFILES } from '../../constants/actionTypes';


export function* fetchUsersProfiles() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`
    );
    console.log('response saga ids users',response);
     yield put({ type: SET_USERS_PROFILES, data: response.data  });
  } catch (e) {
    console.log(e);
  }
}
