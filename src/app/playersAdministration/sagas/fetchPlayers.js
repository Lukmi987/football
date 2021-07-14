import { put, select } from 'redux-saga/effects';
import axios from '../../axios-football';
import {SET_PLAYERS} from "../../constants/actionTypes";



export function* fetchPlayers() {
  console.log('vefetch playfers');
    const userToken = localStorage.token;
    try {
      const responseUsers = yield axios.get(
        `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
      );

      // const responUsersCopy = JSON.parse(JSON.stringify(responseUsers.data));

   if(responseUsers.data) yield put({type: SET_PLAYERS, data: responseUsers.data})
  } catch (e) {

  }
}
