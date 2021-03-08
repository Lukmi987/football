import { takeLatest } from "redux-saga/effects";
import {PROCESS_EVENT, FETCH_EVENTS, PROCESS_EVENT_ATTENDANCE} from "../../constants/actionTypes";
import { processEvent } from "./processEvent";
import { fetchEvents } from "./fetchEvents";
import { processEventAttendance } from "./processEventAttendance";

const eventSagas = [
  takeLatest(PROCESS_EVENT, processEvent),
  takeLatest(FETCH_EVENTS, fetchEvents),
  takeLatest(PROCESS_EVENT_ATTENDANCE, processEventAttendance),
];

export default eventSagas;
