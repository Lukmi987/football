import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import {SET_PLAYERS} from "../../constants/actionTypes";



export function* fetchPlayers() {
    const userToken = localStorage.token;
    try {
      const responsePlayers = yield axios.get(
          `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
      );
    yield put({type: SET_PLAYERS, data: responsePlayers.data})
  } catch (e) {

  }
}
