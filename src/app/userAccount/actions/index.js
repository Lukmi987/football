import { STORE_USER_SAGA, STORE_PROFILE_IMG_URL_SAGA } from '../../constants/actionTypes';

export const storeUser = (user) => ({
  type: STORE_USER_SAGA,
  user,
});

export const storeProfileImgSaga = (profileUrl) => ({
  type: STORE_PROFILE_IMG_URL_SAGA,
  profileUrl,
});
