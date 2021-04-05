import { connect } from "react-redux";
import {
    processEvent
} from "../actions";
import { getUserId, getUser } from "../../../selectors/loginSelectors";
import EventForm from "../components/EventForm";

const mapStateToProps = (state) => ({
    userId: getUserId(state),
    user: getUser(state),
});

const mapDispatchToProps = {
    processEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);