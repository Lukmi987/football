import {
  FETCH_EVENTS,
  FETCH_OCCURRENCES,
  PROCESS_EVENT,
  PROCESS_EVENT_ATTENDANCE,
} from "../../constants/actionTypes";

export const processEventAttendance = (participate, occurrenceId, creationTime) => ({
  type: PROCESS_EVENT_ATTENDANCE,
  participate,
  occurrenceId,
  creationTime
});

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
