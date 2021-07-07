import {FETCH_PLAYERS_SAGA, SAVE_EDITED_PLAYER_SAGA} from '../../constants/actionTypes';
import { fetchPlayers } from './fetchPlayers';
import { takeLatest } from 'redux-saga/effects';
import {saveEditedPlayer} from "./saveEditedPlayer";


const playersAdministrationSagas = [
    takeLatest(FETCH_PLAYERS_SAGA, fetchPlayers),
    takeLatest(SAVE_EDITED_PLAYER_SAGA, saveEditedPlayer)
];

export default playersAdministrationSagas;
