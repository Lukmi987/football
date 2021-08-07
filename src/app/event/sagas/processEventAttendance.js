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
      console.log('data v nechz hledam index',data);

      const userAttendance = data?.find((item) => item?.userId === userId) || undefined;
      console.log('status v userAttendance',userAttendance);

      if (userAttendance === undefined) {
        const addedUserArr = [...(data || []), { userId: userId, status: status }];
        console.log('v -1 jkfjpico',addedUserArr);
        yield axios.put(
          `/occurrences/${occurrenceId}/${creationTime}/attendance.json?auth=${userToken}`,
          addedUserArr,
        );
        yield put({ type: FETCH_OCCURRENCES });
      } else if (userAttendance) {
        const copy = [...data];
        copy[data.findIndex((item) => item.userId === userId)].status = status;
        console.log('nasel v plus jedna',copy);
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
