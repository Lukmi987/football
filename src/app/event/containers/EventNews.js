import { connect } from 'react-redux';
import EventNews from '../components/EventNews';
import { fetchNews, getAdmin, saveNews } from '../actions';
import { getAdminStatus, getUserId } from '../../../selectors/loginSelectors';
import { getEventNews, getLoadingStatus, getOccurrences } from '../../../selectors/eventsSelectors';
import { setLoadingStatus } from '../../loadingStatus/actions';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  occurrencesList: getOccurrences(state),
  loadingStatus: getLoadingStatus(state),
  eventNews: getEventNews(state),
  admin: getAdminStatus(state),
});

const mapDispatchToProps = {
  fetchNews,
  saveNews,
  setLoadingStatus,
  getAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(EventNews);
