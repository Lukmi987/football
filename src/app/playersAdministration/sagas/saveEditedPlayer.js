import axios from '../../axios-football';
import { FETCH_PLAYERS_SAGA, SET_LOADING_EVENT, SET_PLAYERS } from '../../constants/actionTypes';
import { put, select } from 'redux-saga/effects';

export function* saveEditedPlayer(payload) {
  const { userID, isAdmin } = payload.data;
  const userToken = localStorage.token;

  try {
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: true, success: false, error: false } });
    yield put({ type: FETCH_PLAYERS_SAGA });
    const players = yield select((state) => state.players);

    const playerIndex = players.findIndex((user) => user.userID === userID);
    const playersCopy = JSON.parse(JSON.stringify(players));
    playersCopy[playerIndex].isAdmin = isAdmin;

    const responsePlayers = yield axios.put(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
      playersCopy,
    );
    yield put({ type: SET_PLAYERS, data: responsePlayers.data });
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: true, error: false } });
  } catch (e) {
    console.log(e);
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: false, error: true } }); console.log(e);
  }
}
