import { connect } from "react-redux";
import Event from "../components/Event.js";
import { processEvent, processEventAttendance } from "../actions";
import { getEvents } from "../../../selectors/eventsSelectors";
import { getUserId } from "../../../selectors/loginSelectors";
import { fetchEvents } from "../actions";

const mapStateToProps = (state) => ({
  eventsList: getEvents(state),
  userId: getUserId(state)
});

const mapDispatchToProps = {
  processEvent,
  processEventAttendance,
  fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
