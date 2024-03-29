import { connect } from 'react-redux';
import Event from '../components/Event.js';
import { fetchOccurrences, processEvent, processEventAttendance } from '../actions';
import { getFutureOccurrences, getOccurrences } from '../../../selectors/eventsSelectors';
import { getEvents } from '../../../selectors/eventsSelectors';
import { getUserId } from '../../../selectors/loginSelectors';
import { getUser } from '../../../selectors/loginSelectors';
import { fetchEvents } from '../actions';

const mapStateToProps = (state) => ({
  eventsList: getEvents(state),
  userId: getUserId(state),
  user: getUser(state),
  occurrencesList: getFutureOccurrences(state),
});

const mapDispatchToProps = {
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
