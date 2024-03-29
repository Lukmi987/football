import { put, select } from 'redux-saga/effects';
import axios from '../../axios-football';
import { FETCH_OCCURRENCES } from '../../constants/actionTypes';

export function* processEventAttendance(action) {
  const { occurrenceId, status, creationTime } = action;
  const userToken = localStorage.token;

  try {
    if (occurrenceId && creationTime) {
      const { data } = yield axios.get(
        `/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`,
      );
      const userId = localStorage.userId;
      const userIndex = data.findIndex((item) => item.userId === userId);

      if (userIndex === -1) {
        const addedUserArr = [...data, { userId: userId, status: status }];
        yield axios.put(
          `/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`,
          addedUserArr,
        );
        yield put({ type: FETCH_OCCURRENCES });
      } else if (userIndex !== -1) {
        const copy = [...data];
        copy[userIndex].status = status;
        yield axios.put(
          `/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`,
          copy,
        );
        yield put({ type: FETCH_OCCURRENCES });
        yield console.log('last yield');
      }
    }
  } catch (e) {
    console.log(e);
  }
}
