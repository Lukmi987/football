import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_AUTH_INFO, SET_OCCURRENCES } from "../../constants/actionTypes";
import { createOccurrences } from "../../helpers/eventHelpers";

export function* processEvent(action) {
  const eventData = action.sportEvent;
  const eventCount = action.eventCount;
  const startDate = action.sportEvent.startDate;
  const startTime = action.sportEvent.startTime;

  const defaultStartTime = new Date(
    `${startDate.getFullYear()} ${startDate.getMonth()} ${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
  );

  const testData = {MwfsC: {creatingTime: '4545', attendance: ['lukas', 'tomas']}}
  const userToken = localStorage.token;
  try {
    const response = yield axios.post(
      `events.json?auth=${userToken}`,
        eventData
    );
    if (response) {
      if (eventCount > 1) {
        const eventId = response.data.name;
        yield processOccurrences(eventCount, eventId, defaultStartTime);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* processOccurrences(eventCount, eventId, defaultStartTime) {
  try {
    const userToken = localStorage.token;
    const occurrences = createOccurrences(
      eventCount,
      eventId,
      defaultStartTime
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
