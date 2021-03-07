import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_AUTH_INFO } from "../../constants/actionTypes";

export function* processEvent(action) {
  const eventData = action.sportEvent;

  eventData.users = ["Apple", "Banana"];

  const userToken = localStorage.token;
  try {
    const response = yield axios.post(
      `events.json?auth=${userToken}`,
      eventData
    );
    console.log("v event response", response);
    //   // const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
    //   // localStorage.setItem('token', response.data.idToken);
    //   // yield put({type: SET_AUTH_INFO, data: loginAuthInfo});
  } catch (e) {
    console.log(e);
  }
}
