import { createSelector } from "reselect";

export const getUseridToken = createSelector(
  (state) => state,
  (state) => state.login.idToken
);

export const getFirebaseErrMsg = createSelector(
  (state) => state,
  (state) => state.login.errorMsg
);
