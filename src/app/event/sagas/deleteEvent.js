import axios from '../../axios-football';
import {
  SET_FUTURE_OCCURRENCES,
} from '../../constants/actionTypes';
import { put, select } from 'redux-saga/effects';

export function* deleteEvent(action) {
  console.log('action', action);
  try {
    const userToken = localStorage.token;
    const occurrences = yield select((state) => state.futureOccurrences);
    const filteredOccurrences = occurrences.filter(
      (occurrence) => occurrence.creationTime !== action.creationTime,
    );
    const response = yield axios.delete(
      `/occurrences/${action.occurrenceId}/${action.creationTime}.json?auth=${userToken}`,
    );
    yield put({ type: SET_FUTURE_OCCURRENCES, data: filteredOccurrences });
  } catch (e) {
    console.log(e);
  }
}
