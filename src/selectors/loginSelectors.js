import { createSelector } from "reselect";

export const getEvent = createSelector(
  (state) => state,
  (state) => state.event
);

export const getUseridToken = createSelector(
  (state) => state,
  (state) => state.login.idToken
);

export const getFirebaseErrMsg = createSelector(
  (state) => state,
  (state) => state.login.errorMsg
);
