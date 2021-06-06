import { connect } from "react-redux";
import Event from "../components/Event.js";
import {
  fetchOccurrences,
  processEvent,
  processEventAttendance,
} from "../actions";
import { getOccurrences, getUsersProfiles } from '../../../selectors/eventsSelectors';
import { getEvents } from "../../../selectors/eventsSelectors";
import { getUserId } from "../../../selectors/loginSelectors";
import { getUser } from "../../../selectors/loginSelectors";
import { fetchEvents, fetchUsersProfiles } from "../actions";
import EventStats from '../components/EventStats';

const mapStateToProps = (state) => ({
  eventsList: getEvents(state),
  userId: getUserId(state),
  user: getUser(state),
  occurrencesList: getOccurrences(state),
  usersProfiles: getUsersProfiles(state)
});

const mapDispatchToProps = {
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
  fetchUsersProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventStats);
