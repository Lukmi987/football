import { createSelector } from "reselect";

export const getEvents = createSelector(
  (state) => state,
  (state) => state.events
);
