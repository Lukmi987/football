import { connect } from 'react-redux';
import { storeUser } from '../actions';
import { getUserId, getUser } from '../../../selectors/loginSelectors';
import UserAccount from '../components/UserAccount';
import { getEventStatus } from '../../../selectors/eventsSelectors';
import { eventStatus } from '../../event/actions';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  user: getUser(state),
  loadingStatus: getEventStatus(state),
});

const mapDispatchToProps = {
  storeUser,
  eventStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
