import { takeLatest } from 'redux-saga/effects';
import {
  PROCESS_EVENT,
  FETCH_EVENTS,
  PROCESS_EVENT_ATTENDANCE,
  FETCH_OCCURRENCES,
  FETCH_USERS_PROFILES,
  FETCH_NEWS_SAGA,
  SAVE_NEWS_SAGA,
} from '../../constants/actionTypes';
import { processEvent } from './processEvent';
import { fetchEvents } from './fetchEvents';
import { fetchOccurrences } from './fetchOccurrences';
import { processEventAttendance } from './processEventAttendance';
import { fetchUsersProfiles } from './fetchUsersProfiles';
import { fetchNews } from './fetchNews';
import { saveNews } from './saveNews';

const eventSagas = [
  takeLatest(PROCESS_EVENT, processEvent),
  takeLatest(FETCH_EVENTS, fetchEvents),
  takeLatest(FETCH_OCCURRENCES, fetchOccurrences),
  takeLatest(PROCESS_EVENT_ATTENDANCE, processEventAttendance),
  takeLatest(FETCH_USERS_PROFILES, fetchUsersProfiles),
  takeLatest(FETCH_NEWS_SAGA, fetchNews),
  takeLatest(SAVE_NEWS_SAGA, saveNews),
];

export default eventSagas;
