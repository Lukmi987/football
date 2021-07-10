import { SET_FUTURE_OCCURRENCES } from '../../constants/actionTypes';

export default  (state= [], payload) =>  (payload.type === SET_FUTURE_OCCURRENCES ? payload.data : state)