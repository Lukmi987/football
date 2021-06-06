import { createSelector } from "reselect";

export const getOccurrences = createSelector(
    (state) => state,
    (state) => state.occurrencesWithUsers,
)

export const getCreateEventIsCreated = createSelector(
    (state) => state,
    (state) => state.createEvent.isEventCreated,
)


export const getEvents = createSelector(
  (state) => state,
  (state) => state.events
);

export const getEventStatus = createSelector(
    (state) => state,
    (state) => state.eventStatus
);

export const getUsersProfiles = createSelector(
  (state) => state,
  (state) => state.usersProfiles
)
