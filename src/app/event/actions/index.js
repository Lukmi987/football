import { FETCH_EVENTS, PROCESS_EVENT } from "../../constants/actionTypes";

export const processEvent = (sportEvent) => ({
  type: PROCESS_EVENT,
  sportEvent,
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});
