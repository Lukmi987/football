import { connect } from "react-redux";
import {
    processEvent,
    eventStatus,
    createEvent
} from "../actions";
import { getUserId, getUser } from "../../../selectors/loginSelectors";
import EventForm from "../components/EventForm";
import {getEventStatus, getOccurrences} from "../../../selectors/eventsSelectors";

const mapStateToProps = (state) => ({
    userId: getUserId(state),
    user: getUser(state),
    eventStatusMes: getEventStatus(state),
    occurrencesList: getOccurrences(state),
});

const mapDispatchToProps = {
    processEvent,
    eventStatus,
    createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);