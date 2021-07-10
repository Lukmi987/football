import { createSelector } from 'reselect';

export const getOccurrences = createSelector(
  (state) => state,
  (state) => state.occurrencesWithUsers,
);

export const getFutureOccurrences = createSelector(
  (state) => state,
  (state) => state.futureOccurrences,
);

export const getCreateEventIsCreated = createSelector(
  (state) => state,
  (state) => state.createEvent.isEventCreated,
);

export const getEvents = createSelector(
  (state) => state,
  (state) => state.events,
);

export const getLoadingStatus = createSelector(
  (state) => state,
  (state) => state.loadingStatus,
);

export const getUsersProfiles = createSelector(
  (state) => state,
  (state) => state.usersProfiles,
);

export const getEventNews = createSelector(
  (state) => state,
  (state) => state.eventNews,
);

// export const fetchNews = createSelector(
//   (state) => state,
//   (state) => state.
// )
