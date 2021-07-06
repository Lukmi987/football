import { connect } from 'react-redux';
import AddPlayer from '../components/AddPlayer';
import { createPlayer } from '../actions';

const mapStateToProps = (state) => ({

});

//my redux actions
const mapDispatchToProps = {
  createPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
