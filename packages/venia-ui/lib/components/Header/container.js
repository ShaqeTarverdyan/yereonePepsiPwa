import { connect } from '@magento/venia-drivers';

import { toggleSearch } from '../../actions/app';
import { toggleDrawer } from '../../actions/app';
import { getCartDetails, toggleCart } from '../../actions/cart';

import Header from './header';

const mapStateToProps = ({ app, cart }) => {
    const { searchOpen } = app;

    return {
        cart,
        searchOpen
    };
};

const mapDispatchToProps = dispatch => ({
    startRegister: () => dispatch(toggleDrawer('startRegister')),
    getCartDetails: () => dispatch(getCartDetails()),
    toggleCart: () => dispatch(toggleCart('cart')),
    toggleSearch: () => dispatch(toggleSearch())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
