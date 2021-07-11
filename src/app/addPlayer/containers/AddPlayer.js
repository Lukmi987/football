import { connect } from 'react-redux';
import AddPlayer from '../components/AddPlayer';
import { createPlayer } from '../actions';
import { getLoadingStatus } from '../../../selectors/eventsSelectors';
import { setLoadingStatus } from '../../loadingStatus/actions';

const mapStateToProps = (state) => ({
  loadingStatus: getLoadingStatus(state),
});

//my redux actions
const mapDispatchToProps = {
  createPlayer,
  setLoadingStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
