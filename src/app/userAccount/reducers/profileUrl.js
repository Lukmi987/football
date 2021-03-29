import { STORE_PROFILE_IMG_URL } from "../../constants/actionTypes";

const initialState = [];

export default (state = initialState, action) =>
  action.type === STORE_PROFILE_IMG_URL ? action.data : state;
