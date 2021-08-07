import axios from '../../axios-football';
import { FETCH_PLAYERS_SAGA, SET_LOADING_EVENT, STORE_USER } from '../../constants/actionTypes';
import { put } from 'redux-saga/effects';

export function* storeUser(action) {
  console.log('action',action)
  const { nickname, bday, aboutMe, imageUrl, email, firstName, lastName, userId: userIdAddPlayerForm = null, isAdmin = false } = action.user;
  const userToken = localStorage.token;
  const userId = userIdAddPlayerForm || localStorage.userId;
  const imgUrlFromLocalStorage = localStorage.profileUrl;

  try {
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: true, success: false, error: false } });
    const responseUsers = yield axios.get(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
    );

    const findUser = (user) => user.userID === userId;
    const index = responseUsers.data ? responseUsers.data.findIndex(findUser) : -1;
    const playerListCopy = responseUsers.data ? JSON.parse(JSON.stringify(responseUsers.data)) : [];

    if (index !== -1) {
      playerListCopy[index].nickname = nickname;
      playerListCopy[index].age = bday;
      playerListCopy[index].aboutMe = aboutMe;
      playerListCopy[index].profileUrl = imageUrl || imgUrlFromLocalStorage;
    } else {
      playerListCopy.push({ nickname, bday, aboutMe, email, firstName, lastName, profileUrl: imageUrl, userID: userId, isAdmin: isAdmin });
    }
    yield axios.put(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
      playerListCopy,
    );
    localStorage.setItem('profileUrl', imageUrl || imgUrlFromLocalStorage);

    yield put({ type: STORE_USER, data: action.user });
    yield put({ type:FETCH_PLAYERS_SAGA})
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: true, error: false } });
  } catch (e) {
    yield put({ type: SET_LOADING_EVENT, data: { isLoading: false, success: false, error: true } }); console.log(e);
  }
}
