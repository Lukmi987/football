import { connect } from 'react-redux';
import { processEvent, eventStatus, createEvent } from '../actions';
import { getUserId, getUser } from '../../../selectors/loginSelectors';
import EventForm from '../components/EventForm';
import {  getLoadingStatus, getOccurrences } from '../../../selectors/eventsSelectors';
import { setLoadingStatus } from '../../loadingStatus/actions';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  user: getUser(state),
  eventStatusMes: getLoadingStatus(state),
  occurrencesList: getOccurrences(state),
});

const mapDispatchToProps = {
  processEvent,
  setLoadingStatus,
  createEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
