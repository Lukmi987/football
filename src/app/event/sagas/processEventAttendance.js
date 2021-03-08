import { useSelector } from "react-redux";
import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import {getUserId} from "../../../selectors/loginSelectors";


export function* processEventAttendance(action) {
  const { eventId, participate } = action;

  console.log('process userid,eventid,participate',eventId, participate );
  const userToken = localStorage.token;
  try {
     const userId = yield select(getUserId);
    const prepareData = [userId, 'testId']
  console.log('userid is',userId);

     const response = yield axios.put(`/events/${eventId}/users.json?auth=${userToken}`,prepareData);
     console.log('make some noise', response);

  } catch (e) {
    console.log(e);
  }
}
