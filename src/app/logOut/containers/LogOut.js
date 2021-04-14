import { connect } from 'react-redux';
import {logOut} from '../actions';
import { getUseridToken, getFirebaseErrMsg } from '../../../selectors/loginSelectors';
import LogOut from '../components/LogOut';

const mapStateToProps = state => ({
    idToken: getUseridToken(state),
    errorMsg: getFirebaseErrMsg(state),
});

//my redux actions
const mapDispatchToProps = {
    logOut
  };
  export default connect(mapStateToProps, mapDispatchToProps)(LogOut);