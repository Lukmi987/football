import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { FETCH_OCCURRENCES } from "../../constants/actionTypes";

export function* processEventAttendance(action) {
  const { occurrenceId, status, creationTime } = action;
  console.log('tak status je', action);
  const userToken = localStorage.token;

  try {
    if(occurrenceId && creationTime) {
      const { data } = yield axios.get(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`);
      const userId = yield select(state => state.login.userId);
      const user = data.filter( attendance => {
        return attendance.userId === userId;
      })
      const userIndex = data.findIndex((item) => item.userId === userId)

      console.log('v sage manage userIndex je',userIndex);
      if (userIndex === -1) {
        console.log('prvni');
        const addedUserArr = [...data, {userId: userId, status: status}];
        console.log('v sage manage addUser', addedUserArr);
        yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, addedUserArr);
        yield put({type: FETCH_OCCURRENCES});
       }
      else if (userIndex !== -1) {
        const copy = [...data];
        console.log('druha', copy[userIndex], 'a cista copy',copy);
        copy[userIndex].status = status;
        console.log('a cista copy po zmene',copy);
        yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, copy);
        yield put({type: FETCH_OCCURRENCES});
        yield console.log('last yield');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

