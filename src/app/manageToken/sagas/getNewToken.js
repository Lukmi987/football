import axios from "axios";
import { put } from "redux-saga/effects";

export function* getNewToken() {
  try {
    const url = `https://securetoken.googleapis.com/v1/token?key=AIzaSyD7J2_txRFfn1GMfwCF0U7is1HQilKUnog`;
    const refreshToken = localStorage.refreshToken;
    const response =  yield axios({
      method: "POST",
      url: url,
      content_type: "application/x-www-form-urlencoded",
      data: {grant_type: 'refresh_token', refresh_token: refreshToken},
    });

    const  expTime = response.data.expires_in * 1000;
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('userId', response.data.user_id);
    localStorage.setItem('expTime',expTime.toString());
    localStorage.setItem('refreshToken', response.data.refresh_token);
    const tokenCreatedTime = new Date().getTime().toString();
    localStorage.setItem('tokenCreatedTime',tokenCreatedTime);
  } catch (e) {
    console.log('manage saga token error',e);
  }
}
