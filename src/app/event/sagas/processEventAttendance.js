import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { FETCH_OCCURRENCES } from "../../constants/actionTypes";

export function* processEventAttendance(action) {
  const { occurrenceId, participate, creationTime } = action;
  console.log('tak',occurrenceId, creationTime);
  const userToken = localStorage.token;

  try {
    if(occurrenceId && creationTime) {
      const response = yield axios.get(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`);
      const userId = yield select(state => state.login.userId);
      const user = response.data.filter(id => {
        return id === userId;
      })

      if (participate && !user.length) {
        const addedUserArr = [...response.data, userId];
        yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, addedUserArr);
        yield put({type: FETCH_OCCURRENCES});
      } else if (!participate && user.length) {
        const removedUserArr = response.data.filter(id => {
          return id != userId;
        })
        yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, removedUserArr);
        yield put({type: FETCH_OCCURRENCES});
      }
    }
  } catch (e) {
    console.log(e);
  }
}

