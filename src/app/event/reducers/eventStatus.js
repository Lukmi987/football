import { SET_LOADING_EVENT } from "../../constants/actionTypes";

const initialState = {
    isLoading: false,
    success: false,
    error: false
}

export default (state = initialState, action) =>
  action.type === SET_LOADING_EVENT ? action.data : state;
