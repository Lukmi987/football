import {SET_AUTH_INFO } from "../../constants/actionTypes";

const initialState = {idToken: null, errorMsg: null}

export default (state = initialState, action) => (  
    action.type === SET_AUTH_INFO ? action.data : state
)

