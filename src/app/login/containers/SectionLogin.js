import { connect } from 'react-redux';
import { logOut, processLoginForm } from '../actions';
import { getUseridToken, getFirebaseErrMsg } from '../../../selectors/loginSelectors';
import SectionLogin from '../components/SectionLogin';

const mapStateToProps = (state) => ({
  idToken: getUseridToken(state),
  errorMsg: getFirebaseErrMsg(state),
});

//my redux actions
const mapDispatchToProps = {
  processLoginForm,
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionLogin);
