import { connect } from 'react-redux';
import { getUseridToken, getFirebaseErrMsg } from '../../../selectors/loginSelectors';
import AddPlayer from '../components/AddPlayer';

const mapStateToProps = (state) => ({
  idToken: getUseridToken(state),
  errorMsg: getFirebaseErrMsg(state),
});

//my redux actions
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
