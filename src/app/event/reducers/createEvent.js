import { createEvent } from '../actions'

const initialState = {
    isEventCreated: false,
    errorCreatingEvent: false,
};

export default (state = initialState, { type }) => {
    // action.type === SET_EVENT ? action.data : state;
    switch (type) {
        case createEvent.REQUEST:
            return {
                ...state,
                isEventCreated: false,
                errorCreatingEvent: false,
            }
        case createEvent.FAILURE:
            return {
                ...state,
                errorCreatingEvent: true,
            }
        case createEvent.SUCCESS:
            return {
                ...state,
                isEventCreated: true,
            }
        default:
            return state;
    }
}