import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import {SET_AUTH_INFO, SET_LOADING_EVENT, SET_OCCURRENCES} from "../../constants/actionTypes";
import { createOccurrences } from "../../helpers/eventHelpers";
import { createEvent } from '../actions'

export function* processEvent(action) {
 /* yield put(createEvent.REQUEST()) */
  yield put({type:SET_LOADING_EVENT, data: {isLoading: true, success: false ,error: false}})
  const eventData = action.sportEvent;
  const eventCount = action.eventCount;
  const eventType = action.sportEvent.eventType;
  const startDate = action.sportEvent.startDate;
  const startTime = action.sportEvent.startTime;
  const defaultStartTime = new Date(
    `${startDate.getFullYear()} ${startDate.getMonth() + 1} ${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
  );

  // fix the date for start time
  eventData.startTime = defaultStartTime;
  const userToken = localStorage.token;
  try {
    const response = yield axios.post(`events.json/?auth=${userToken}`, eventData);
    if (response) {
        const eventId = response.data.name;
        yield processOccurrences(eventCount, eventId, defaultStartTime, eventType);
    }
    // yield put(createEvent.SUCCESS());
    yield put({type:SET_LOADING_EVENT, data: {isLoading: false, success:true ,error: false}})
  } catch (e) {
    console.log(e);
    yield put({type:SET_LOADING_EVENT, data: {isLoading: false, success: false ,error: e}})
  }
}

function* processOccurrences(eventCount, eventId, defaultStartTime, eventType) {
  try {
    const userToken = localStorage.token;
    const occurrences = createOccurrences(
      eventCount,
      eventId,
      defaultStartTime,
        eventType
    );

    const res = yield axios.post(
      `occurrences.json?auth=${userToken}`,
      occurrences
    );
    yield put({ type: SET_OCCURRENCES, data: occurrences });
  } catch (err) {
    console.log(err);
  }
}
