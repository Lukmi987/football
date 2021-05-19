import axios from "axios";
import { put } from "redux-saga/effects";

export function* getNewToken() {
  try {
    console.log('token new saga1');
    const url = `https://securetoken.googleapis.com/v1/token?key=AIzaSyD7J2_txRFfn1GMfwCF0U7is1HQilKUnog`;
    const refreshToken = localStorage.refreshToken;
    const response =  yield axios({
      method: "POST",
      url: url,
      content_type: "application/x-www-form-urlencoded",
      data: {grant_type: 'refresh_token', refresh_token: refreshToken},
    });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('userId', response.data.user_id);
    console.log('token new saga',response);
  } catch (e) {
    console.log('manage saga token error',e);
  }
}
