import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { FETCH_OCCURRENCES } from "../../constants/actionTypes";

export function* processEventAttendance(action) {
  const { occurrenceId, status, creationTime } = action;
  console.log('tak status je', action);
  const userToken = localStorage.token;

  try {
    if(occurrenceId && creationTime) {
      const response = yield axios.get(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`);
      const userId = yield select(state => state.login.userId);
      // const user = response.data.filter( attendance => {
      //   return attendance.userId === userId;
      // })

      console.log('v sage manage');
      if (status != null) {
        const addedUserArr = [...response.data, {[userId]: status}];
        console.log('v sage manage addUser', addedUserArr);
        yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, addedUserArr);
        yield put({type: FETCH_OCCURRENCES});
       }
      //else if (!participate && user.length) {
      //   console.log('pragu');
      //   const removedUserArr = response.data.filter(id => {
      //     return id != userId;
      //   })
      //   yield axios.put(`/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`, removedUserArr);
      //   yield put({type: FETCH_OCCURRENCES});
      //   yield console.log('last yield');
      // }
    }
  } catch (e) {
    console.log(e);
  }
}

