import {DELETE_AUTH_INFO } from "../../constants/actionTypes";

const initialState = {idToken: null, userId: null, errorMsg: null}
console.log('v log out');
export default (state = initialState, action) => (  
    action.type === DELETE_AUTH_INFO ? action.data : state
)

