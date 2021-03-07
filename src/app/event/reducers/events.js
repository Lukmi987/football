import { SET_EVENT } from "../../constants/actionTypes";

const initialState = [];

export default (state = initialState, action) =>
  action.type === SET_EVENT ? action.data : state;
