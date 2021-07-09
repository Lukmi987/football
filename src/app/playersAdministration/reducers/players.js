import { SET_PLAYERS} from '../../constants/actionTypes';

export  default (state = [], payload) =>
    payload.type === SET_PLAYERS ? payload.data : state;
