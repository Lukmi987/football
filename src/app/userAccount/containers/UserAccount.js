import { connect } from "react-redux";
import {
  storeProfileImg
} from "../actions";
import { getUserId } from "../../../selectors/loginSelectors";
import UserAccount from "../components/UserAccount";

const mapStateToProps = (state) => ({
  userId: getUserId(state),
});

const mapDispatchToProps = {
  storeProfileImg
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
