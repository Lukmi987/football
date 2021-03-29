import {STORE_PROFILE_IMG_URL, STORE_PROFILE_IMG_URL_SAGA} from '../../constants/actionTypes'

export const storeProfileImg = (profileUrl) => ({
    type: STORE_PROFILE_IMG_URL,
    profileUrl
  });

export const storeProfileImgSaga = (profileUrl) => ({
    type: STORE_PROFILE_IMG_URL_SAGA,
    profileUrl
});





