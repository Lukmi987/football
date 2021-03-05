import { SET_AUTH_INFO, SET_EVENT } from "../../constants/actionTypes";

const initialState = null;

export default (state = initialState, action) =>
  action.type === SET_EVENT ? action.data : state;
