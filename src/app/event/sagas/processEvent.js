import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_AUTH_INFO } from "../../constants/actionTypes";

export function* processEvent(action) {
  const eventData = action.sportEvent;
  const eventCount = action.eventCount;
  const startDate = action.sportEvent.startDate;

  console.log("action", action);

  const userToken = localStorage.token;
  try {
    const response = yield axios.post(
      `events.json?auth=${userToken}`,
      eventData
    );
    debugger;
    if (response) {
      if (eventCount > 1) {
        const eventId = response.data.name;
        // yield processOcurrences(eventCount, eventId, startDate);
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

// function* processOccurrences(eventCount, eventId, startDate) {
//   console.log(
//     "moje response v process Ocurrences",
//     eventCount,
//     eventId,
//     startDate
//   );
//   debugger;
//
//   const createOccurences = (eventCount, eventId, startDate) => {
//     const occurrences = [];
//     for (let i = 0; i < eventCount; i++) {
//       const increaseWeeks = i * 7;
//       const occurrence = {
//         startDate: {
//           eventId,
//           attendance: [],
//         },
//       };
//       occurrences.push(occurrence);
//     }
//   };
// }
