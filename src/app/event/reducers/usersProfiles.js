import { SET_USERS_PROFILES } from '../../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) =>
  action.type === SET_USERS_PROFILES ? action.data : state;
