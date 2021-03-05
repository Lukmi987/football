import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";

export function* fetchEvents() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/events.json?auth=${userToken}`);
    console.log("v event  fetch response", response);
    //   // const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
    //   // localStorage.setItem('token', response.data.idToken);

    yield put({ type: SET_EVENT, data: response.data });
  } catch (e) {
    console.log(e);
  }
}
