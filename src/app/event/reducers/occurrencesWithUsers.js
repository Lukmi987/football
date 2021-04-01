import { SET_OCCURRENCES_WITH_USERS } from "../../constants/actionTypes";

const initialState = [];

export default (state = initialState, action) =>
  action.type === SET_OCCURRENCES_WITH_USERS ? action.data : state;
