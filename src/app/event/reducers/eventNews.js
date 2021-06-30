import { STORE_EVENT_NEWS } from '../../constants/actionTypes';

const initialState = [];

export default (state = initialState, payload) =>
  payload.type === STORE_EVENT_NEWS ? payload.data : state;
