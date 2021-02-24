import { connect } from 'react-redux';
import {logOut, processLoginForm} from '../actions';
import { getUserLoginInfo } from '../../../selectors/loginSelectors';
import SectionLogin from '../components/SectionLogin';

const mapStateToProps = state => ({
    idToken: getUserLoginInfo(state)
});

//my redux actions
const mapDispatchToProps = {
    processLoginForm,
    logOut
  };

  export default connect(mapStateToProps, mapDispatchToProps)(SectionLogin);