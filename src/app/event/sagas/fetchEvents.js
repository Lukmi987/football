import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";

export function* fetchEvents() {
  try {
    const userToken = localStorage.token;
    // const response = yield axios.get(`/events.json?auth=${userToken}`);
    const response = yield axios.get(
      `/events/-MVDLFYUuzmQCGKssVk1.json?auth=${userToken}`
    );
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjsssssssss", response);
    debugger;
    const entries = Object.entries(response.data);
    const events = entries.reduce(loadEvents, []);
    console.log("ve fetchEvents saga", events);
    yield put({ type: SET_EVENT, data: events });
  } catch (e) {
    console.log(e);
  }
}
