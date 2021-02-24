import { createSelector } from 'reselect';

export const getUserLoginInfo = createSelector(
    (state) => state,
    (state) => state.login.idToken,
);