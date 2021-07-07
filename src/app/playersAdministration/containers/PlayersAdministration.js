import { connect } from 'react-redux';
import PlayersAdministration from '../components/PlayersAdministration';
import {fetchPlayers, saveEditedPlayer} from '../actions';
import {getPlayers} from "../../../selectors/playersAdministrationSelectors";

const mapStateToProps = (state) => ({
players: getPlayers(state)
});

//my redux actions
const mapDispatchToProps = {
  fetchPlayers,
  saveEditedPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersAdministration);
