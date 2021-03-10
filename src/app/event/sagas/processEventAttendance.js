import { useSelector } from "react-redux";
import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { FETCH_EVENTS, SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import { getUserId } from "../../../selectors/loginSelectors";
import { fetchEvents } from "./fetchEvents";

export function* processEventAttendance(action) {
  const { eventId, participate } = action;

  console.log("process userid,eventid,participate", eventId, participate);
  const userToken = localStorage.token;
  try {
    const userId = yield select(getUserId);
    //get event according to id, attendance
    const prepareData = [userId, "testId"];
    console.log("userid is", userId);

    const response = yield axios.put(
      `/events/${eventId}/attendance.json?auth=${userToken}`,
      prepareData
    );
    yield put({ type: FETCH_EVENTS });
  } catch (e) {
    console.log(e);
  }
}
