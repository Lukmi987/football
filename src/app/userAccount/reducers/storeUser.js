import { STORE_USER } from "../../constants/actionTypes";

const initialState = [];

export default (state = initialState, action) =>
  action.type === STORE_USER ? action.data : state;
