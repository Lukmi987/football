import { createSelector } from "reselect";

export const getOccurrences = createSelector(
    (state) => state,
    (state) => state.occurrencesWithUsers,
)



export const getEvents = createSelector(
  (state) => state,
  (state) => state.events
);
