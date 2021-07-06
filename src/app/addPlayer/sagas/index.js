import { takeLatest } from 'redux-saga/effects';
import { CREATE_PLAYER_SAGA,  } from '../../constants/actionTypes';
import { createPlayer } from './createPlayer';


const addPlayerSagas = [takeLatest(CREATE_PLAYER_SAGA, createPlayer)];

export default addPlayerSagas;
