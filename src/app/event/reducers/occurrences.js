import { SET_OCCURRENCES } from '../../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) =>
  action.type === SET_OCCURRENCES ? action.data : state;
