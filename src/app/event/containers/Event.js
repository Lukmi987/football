import { connect } from "react-redux";
import Event from "../components/Event.js";
import { processEvent } from "../actions";
import { getEvents } from "../../../selectors/eventsSelectors";
import { fetchEvents } from "../actions";

const mapStateToProps = (state) => ({
  eventsList: getEvents(state),
});

const mapDispatchToProps = {
  processEvent,
  fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
