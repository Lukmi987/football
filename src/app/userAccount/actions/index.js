import { STORE_USER_SAGA, STORE_PROFILE_IMG_URL_SAGA } from '../../constants/actionTypes';

export const storeUser = (user) => ({
  type: STORE_USER_SAGA,
  user,
});
