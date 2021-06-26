import { connect } from "react-redux";
import EventNews from '../components/EventNews';
import { eventStatus, fetchNews, saveNews } from '../actions';
import { getUserId } from '../../../selectors/loginSelectors';
import { getEventNews, getEventStatus, getOccurrences } from '../../../selectors/eventsSelectors';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  occurrencesList: getOccurrences(state),
  loadingStatus: getEventStatus(state),
  eventNews: getEventNews(state),
});

const mapDispatchToProps = {
  fetchNews,
  saveNews,
  eventStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(EventNews);