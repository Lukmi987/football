import { connect } from 'react-redux';

import App from '../../../App';
import { getTokenStatus } from '../../../selectors/loginSelectors';
import { getNewToken, setTokenStatus } from '../../manageToken/actions';

const mapStateToProps = (state) => ({
  tokenStatus: getTokenStatus(state),
});

const mapDispatchToProps = {
  setTokenStatus,
  getNewToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
