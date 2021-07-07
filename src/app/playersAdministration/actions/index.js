import {FETCH_PLAYERS_SAGA, SAVE_EDITED_PLAYER_SAGA} from '../../constants/actionTypes';

export const fetchPlayers = () => ({
  type: FETCH_PLAYERS_SAGA,
})

export const saveEditedPlayer = (payload) => ({
  types: SAVE_EDITED_PLAYER_SAGA,
  data: payload
});