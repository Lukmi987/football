import { connect } from "react-redux";
import {
    setTokenStatus,
    getNewToken
} from "../actions";
import ManageToken from "../components/ManageToken";

const mapDispatchToProps = {
    setTokenStatus,
    getNewToken,

};

export default connect(null, mapDispatchToProps)(ManageToken);