import { SET_TOKEN_STATUS } from '../../constants/actionTypes';

const initialState = {deleted: true};

export default (state = initialState, action) =>
  action.type === SET_TOKEN_STATUS ? action.data : state;
