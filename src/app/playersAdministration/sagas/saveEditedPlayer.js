import { FETCH_PLAYERS_SAGA, SET_PLAYERS } from '../../constants/actionTypes';
import { put, select } from 'redux-saga/effects';
import axios from 'axios';

export function* saveEditedPlayer(payload) {
  const { player } = payload.data;
  const userToken = localStorage.token;

  try {
    yield put({ type: FETCH_PLAYERS_SAGA });
    const players = select((state) => state.players);
    const findUser = (user) => user.userID === player.userID;
    const playerIndex = players.findIndex(findUser);
    const playersCopy = JSON.parse(JSON.stringify(players));
    playersCopy[playerIndex].isAdmin = player.isAdmin;

    const responsePlayers = yield axios.put(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
      playersCopy,
    );

    yield put({ type: SET_PLAYERS, data: responsePlayers.data });
  } catch (e) {}
}
