import { connect } from 'react-redux';
import Event from '../components/Event.js'
import { getUseridToken, getFirebaseErrMsg } from '../../../selectors/loginSelectors';


const mapStateToProps = state => ({
    idToken: getUseridToken(state),
    errorMsg: getFirebaseErrMsg(state),
});

//my redux actions
const mapDispatchToProps = {
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Event);