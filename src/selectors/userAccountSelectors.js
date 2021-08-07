import { createSelector } from 'reselect';

export const getProfileUrl = createSelector(
  (state) => state,
  (state) => state.profileUrl,
);



