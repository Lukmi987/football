import { put } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_LOADING_EVENT, STORE_EVENT_NEWS } from '../../constants/actionTypes';


// const delay = (ms) => new Promise(response => setTimeout(response, ms));
// yield (delay(1000);

export function* saveNews (payload)  {
  console.log('payload',payload);
  try {
    yield put({type: SET_LOADING_EVENT, data: {isLoading: true, success: false, error: false }});
    const response =  yield  axios.put('eventNews.json/', payload.data);
    console.log('response', response);
    yield put({type: STORE_EVENT_NEWS, data: response.data});
    yield put({type: SET_LOADING_EVENT, data: {isLoading: false, success: true, error: false }});
  } catch (e) {
    console.log(e);
    yield put({type: SET_LOADING_EVENT, data: {isLoading: false, success: false, error: true }});
  }
}