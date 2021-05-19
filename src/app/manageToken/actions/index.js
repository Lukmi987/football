import {
    GET_NEW_TOKEN_SAGA,
    SET_TOKEN_STATUS,
} from '../../constants/actionTypes';

export const setTokenStatus = (action) => ({
    type: SET_TOKEN_STATUS,
    data: action,
});

export const getNewToken = () => ({
    type: GET_NEW_TOKEN_SAGA,
})




