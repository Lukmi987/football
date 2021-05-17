import { connect } from "react-redux";
import {
    setTokenStatus
} from "../actions";
import ManageToken from "../components/ManageToken";

const mapDispatchToProps = {
    setTokenStatus
};

export default connect(null, mapDispatchToProps)(ManageToken);