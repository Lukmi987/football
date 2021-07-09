import { connect } from 'react-redux';
import PlayersAdministration from '../components/PlayersAdministration';
import {fetchPlayers, saveEditedPlayer} from '../actions';
import {getPlayers} from "../../../selectors/playersAdministrationSelectors";
import { getLoadingStatus } from '../../../selectors/eventsSelectors';

const mapStateToProps = (state) => ({
players: getPlayers(state),
  loadingStatus: getLoadingStatus(state),
});

//my redux actions
const mapDispatchToProps = {
  fetchPlayers,
  saveEditedPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersAdministration);
