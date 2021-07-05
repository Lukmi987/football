import { SET_LOADING_EVENT } from '../../constants/actionTypes';

export const setLoadingStatus = () => ({
  type: SET_LOADING_EVENT,
  data: {
    isLoading: false,
    success: false,
    error: false,
  },
});