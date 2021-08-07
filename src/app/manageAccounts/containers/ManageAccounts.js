import ManageAccounts from '../components/ManageAccounts';
import { getAdmin } from '../../event/actions';
import { getAdminStatus } from '../../../selectors/loginSelectors';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  admin: getAdminStatus(state)
})

const mapDispatchToProps = {
  getAdmin,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccounts);