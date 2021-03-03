import { takeLatest } from "redux-saga/effects";
import { PROCESS_EVENT, FETCH_EVENTS } from "../../constants/actionTypes";
import { processEvent } from "./processEvent";
import { fetchEvents } from "./fetchEvents";

const eventSagas = [
  takeLatest(PROCESS_EVENT, processEvent),
  takeLatest(FETCH_EVENTS, fetchEvents),
];

export default eventSagas;
