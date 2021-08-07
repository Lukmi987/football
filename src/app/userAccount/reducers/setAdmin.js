import { SET_ADMIN } from '../../constants/actionTypes';

const initialState = {isAdmin: false};

export default (state = initialState, action) => (action.type === SET_ADMIN ? action.data : state);
