import { takeLatest } from 'redux-saga/effects';
import {fetchUserList} from "./fetchUserList";

// const fetchUserList = () => {1};

//listen for CHANGE_COUNTER
const counterSagas = [
    takeLatest('FETCH_USER_LIST', fetchUserList),
  ];

export default counterSagas;