import { takeLatest } from "redux-saga/effects"
import { GET_NEW_TOKEN_SAGA } from '../../constants/actionTypes';
import { getNewToken } from "./getNewToken";

const manageTokenSagas = [takeLatest(GET_NEW_TOKEN_SAGA, getNewToken )];

export default manageTokenSagas;