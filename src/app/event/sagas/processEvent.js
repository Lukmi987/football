import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_AUTH_INFO } from "../../constants/actionTypes";

export function* processEvent(action) {
  const eventData = action.sportEvent;
  const x = "lukas";
  const data = {
    x,
    player2: "madar",
    player3: "rum",
  };
  // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
  // if (!isSignup) {
  //   url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg';
  // }
  try {
    const response = yield axios.post("/events.json", eventData);
    console.log("v event response", response);
    //   // const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
    //   // localStorage.setItem('token', response.data.idToken);
    //   // yield put({type: SET_AUTH_INFO, data: loginAuthInfo});
  } catch (e) {
    console.log(e);
  }
}
