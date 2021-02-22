import { connect } from 'react-redux';
import {logOut, processLoginForm} from '../actions';
import SectionLogin from '../components/SectionLogin';

const mapStateToProps = state => ({
    lukas: 'lukas'
});

//my redux actions
const mapDispatchToProps = {
    processLoginForm,
    logOut
  };

  export default connect(mapStateToProps, mapDispatchToProps)(SectionLogin);