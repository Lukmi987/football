import { CREATE_PLAYER_SAGA } from '../../constants/actionTypes';

export const createPlayer = (payLoad) => ({
  type: CREATE_PLAYER_SAGA,
  data: payLoad
})