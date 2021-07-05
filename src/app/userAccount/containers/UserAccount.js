import { connect } from 'react-redux';
import { storeUser } from '../actions';
import { getUserId, getUser } from '../../../selectors/loginSelectors';
import UserAccount from '../components/UserAccount';
import {  getLoadingStatus } from '../../../selectors/eventsSelectors';
import { setLoadingStatus } from '../../loadingStatus/actions';


const mapStateToProps = (state) => ({
  userId: getUserId(state),
  user: getUser(state),
  loadingStatus: getLoadingStatus(state),
});

const mapDispatchToProps = {
  storeUser,
  setLoadingStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
