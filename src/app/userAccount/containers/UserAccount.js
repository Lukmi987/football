import { connect } from 'react-redux';
import { storeUser, storeProfileImgSaga } from '../actions';
import { getUserId, getUser } from '../../../selectors/loginSelectors';
import UserAccount from '../components/UserAccount';

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  user: getUser(state),
});

const mapDispatchToProps = {
  storeProfileImgSaga,
  storeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
