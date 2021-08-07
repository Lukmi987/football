import { connect } from 'react-redux';
import Event from '../components/Event.js';
import { deleteEvent, fetchOccurrences, getAdmin, processEvent, processEventAttendance } from '../actions';
import { getFutureOccurrences, getOccurrences } from '../../../selectors/eventsSelectors';
import { getEvents } from '../../../selectors/eventsSelectors';
import { getAdminStatus, getUserId } from '../../../selectors/loginSelectors';
import { getUser } from '../../../selectors/loginSelectors';
import { fetchEvents } from '../actions';

const mapStateToProps = (state) => ({
  eventsList: getEvents(state),
  userId: getUserId(state),
  user: getUser(state),
  occurrencesList: getFutureOccurrences(state),
  admin: getAdminStatus(state),
});

const mapDispatchToProps = {
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
  deleteEvent,
  getAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
