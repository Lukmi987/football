import { FETCH_EVENTS, PROCESS_EVENT, PROCESS_EVENT_ATTENDANCE } from "../../constants/actionTypes";

export const processEventAttendance = (participate, eventId) =>({
  type: PROCESS_EVENT_ATTENDANCE,
  participate: participate,
  eventId: eventId
});



export const processEvent = (sportEvent) => ({
  type: PROCESS_EVENT,
  sportEvent,
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});
