import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_AUTH_INFO } from "../../constants/actionTypes";

export function* processEvent(action) {
  const eventData = action.sportEvent;
  const eventCount = action.eventCount;
  const startDate = action.sportEvent.startDate;
  const startTime = action.sportEvent.startTime;

  const defaultStartTime = new Date(
    `${startDate.getFullYear()} ${startDate.getMonth()} ${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
  );
  console.log("time 1", defaultStartTime);
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
    console.log("v event response", response);
    //   // const loginAuthInfo = {idToken: response.data.idToken, userId: response.data.localId };
    //   // localStorage.setItem('token', response.data.idToken);
    //   // yield put({type: SET_AUTH_INFO, data: loginAuthInfo});
  } catch (e) {
    console.log(e);
  }
}

function* processOccurrences(eventCount, eventId, defaultStartTime) {
  const occurrences = createOccurrences(eventCount, eventId, defaultStartTime);
  console.log("my occurences", occurrences);
}

const createOccurrences = (eventCount, eventId, defaultStartTime) => {
  const occurrences = [];
  const occurrence = {};
  console.log("time 2", defaultStartTime);
  for (let i = 0; i < eventCount; i++) {
    let increaseWeeks = i * 7;
    let time = defaultStartTime.getTime();
    if (increaseWeeks) {
      time = defaultStartTime.setDate(increaseWeeks);
    }
    console.log("this is my song", time);
    occurrences[time] = {
      eventId,
      attendance: [],
    };
    // occurrences.push(occurrence);
  }
  return occurrences;
};
