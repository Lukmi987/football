import { connect } from 'react-redux';
import Login from '../components/SectionLogin';
import { fetchUserList } from '../actions';
1
const mapStateToProps = state => ({
    lukas: 'lukas'
});

//my redux actions
const mapDispatchToProps = {
    fetchUserList
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Login);