import {
  FETCH_EVENTS,
  FETCH_OCCURRENCES,
  PROCESS_EVENT,
  PROCESS_EVENT_ATTENDANCE, SET_LOADING_EVENT,
} from "../../constants/actionTypes";
import { createRoutine } from 'redux-saga-routines';

export const processEventAttendance = (status, occurrenceId, creationTime) => ({
  type: PROCESS_EVENT_ATTENDANCE,
  status,
  occurrenceId,
  creationTime
});

export const createEvent = createRoutine("CREATE_EVENT");

export const processEvent = (sportEvent, eventCount) => ({
  type: PROCESS_EVENT,
  sportEvent,
  eventCount,
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});
export const fetchOccurrences = () => ({
  type: FETCH_OCCURRENCES,
});

export const eventStatus = () => ({
  type: SET_LOADING_EVENT,
  data:
  {
  isLoading: false,
      success: false,
    error: false
  }
});

