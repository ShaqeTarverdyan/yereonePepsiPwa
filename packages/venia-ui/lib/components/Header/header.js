import React, { Suspense } from 'react';
import { bool, func, object, shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';
import NavigationDesktop from '../NavigationDesktop';
import MiniCart from '../MiniCartDesktop';
import Icon from '../Icon';
import { Menu as MenuIcon } from 'react-feather';



import UserTrigger from './userTrigger';
import HeaderTop from './HeaderTop';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from '../OnlineIndicator';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';

const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        cart,
        getCartDetails,
        hasBeenOffline,
        isOnline,
        searchOpen,
        toggleCart,
        toggleSearch,
        openSignIn,
        startRegister
    } = props;

    const cartTriggerProps = { cart, getCartDetails, toggleCart };
    const classes = mergeClasses(defaultClasses, props.classes);
    const suspenseFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    return (
        <header className={classes.root}>
            <HeaderTop />
            <div className={classes.mainHeader}>
                <div >
                    <Link to={resourceUrl('/')}>
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                </div>
                <div className={classes.actions}>
                    <div>
                        <Suspense fallback={searchOpen ? suspenseFallback : null}>
                            <Route
                                render={({ history, location }) => (
                                    <SearchBar
                                        isOpen={true}
                                        history={history}
                                        location={location}
                                    />
                                )}
                            />
                        </Suspense>
                    </div>
                    <div className={classes.userTrigger}>
                        <UserTrigger startRegister={startRegister}/>
                    </div>
                    <div className={classes.cart}>
                        <div className={classes.cartTrigger}>
                            <CartTrigger {...cartTriggerProps} />
                        </div>
                        <div className={classes.miniCart}>
                            <MiniCart isOpen={true} />
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={classes.menuList}>
                <NavigationDesktop />
            </div>
            <div className={classes.menuMobile}>
                <NavTrigger>
                    <Icon src={MenuIcon} />
                </NavTrigger>
            </div>
        </header>
    );
};

Header.propTypes = {
    cart: object,
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
    }),
    getCartDetails: func,
    searchOpen: bool,
    toggleCart: func,
    toggleSearch: func.isRequired
};

export default Header;
