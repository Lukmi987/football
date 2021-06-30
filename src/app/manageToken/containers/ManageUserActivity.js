import { connect } from 'react-redux';
import { setTokenStatus, getNewToken } from '../actions';
import ManageUserActivity from '../components/ManageUserActivity';
import { getTokenStatus } from '../../../selectors/loginSelectors';

const mapStateToProps = (state) => ({
  tokenStatus: getTokenStatus(state),
});

const mapDispatchToProps = {
  setTokenStatus,
  getNewToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserActivity);
