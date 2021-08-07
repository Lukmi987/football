import { createSelector } from 'reselect';

export const getUser = createSelector(
  (state) => state,
  (state) => state.user,
);

export const getUseridToken = createSelector(
  (state) => state,
  (state) => state.login.idToken,
);

export const getUserId = createSelector(
  (state) => state,
  (state) => state.login.userId,
);

export const getFirebaseErrMsg = createSelector(
  (state) => state,
  (state) => state.login.errorMsg,
);

export const getTokenStatus = createSelector(
  (state) => state,
  (state) => state.manageToken.deleted,
);

export const getAdminStatus = createSelector(
  (state) => state,
  (state) => state.admin
)
