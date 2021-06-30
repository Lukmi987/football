import axios from '../../axios-football';
import { STORE_EVENT_NEWS } from '../../constants/actionTypes';
import { put } from 'redux-saga/effects';

export function* fetchNews() {
  try {
    const response = yield axios.get('eventNews.json/');
    yield put({ type: STORE_EVENT_NEWS, data: response.data });
  } catch (e) {
    console.log(e);
  }
}
