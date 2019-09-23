import { connect } from '@magento/venia-drivers';
import Account from './account';
import { toggleDrawer } from '../../actions/app';



const mapDispatchToProps = dispatch => ({
    openSignIn: () => dispatch(toggleDrawer('openSignIn')),
    openCreateAccout: () => dispatch(toggleDrawer('createAccount')),
});

export default connect(
    null,
    mapDispatchToProps
)(Account);
