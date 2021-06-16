import { connect } from "react-redux";
import EventNews from '../components/EventNews';
import {fetchNews} from "../actions"
import { getUserId } from '../../../selectors/loginSelectors';
import { getOccurrences } from '../../../selectors/eventsSelectors';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  occurrencesList: getOccurrences(state),
});

const mapDispatchToProps = {
  fetchNews
};

export default connect(mapStateToProps, mapDispatchToProps)(EventNews);