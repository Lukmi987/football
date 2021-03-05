import { connect } from "react-redux";
import Event from "../components/Event.js";
import { processEvent } from "../actions";
import {
  getUseridToken,
  getFirebaseErrMsg,
  getEvent,
} from "../../../selectors/loginSelectors";
import { fetchEvents } from "../actions";

const mapStateToProps = (state) => ({
  idToken: getUseridToken(state),
  errorMsg: getFirebaseErrMsg(state),
  event: getEvent(state),
});

const mapDispatchToProps = {
  processEvent,
  fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
