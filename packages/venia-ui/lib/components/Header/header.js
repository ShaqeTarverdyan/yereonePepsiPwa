import React, { Suspense } from 'react';
import { bool, func, object, shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';
import NavigationDesktop from '../NavigationDesktop';



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
        toggleSearch
    } = props;

    const cartTriggerProps = { cart, getCartDetails, toggleCart };
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const suspenseFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    return (
        <header className={rootClass}>
            <HeaderTop />
            <div className={classes.mainHeader}>
                <div >
                    <NavTrigger>menuuu</NavTrigger>
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
                        <UserTrigger />
                    </div>
                    <div className={classes.cartTrigger}>
                        <CartTrigger {...cartTriggerProps} />
                    </div>
                    
                </div>
            </div>
            <div>
                <NavigationDesktop />
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
        toolbar: string
    }),
    getCartDetails: func,
    searchOpen: bool,
    toggleCart: func,
    toggleSearch: func.isRequired
};

export default Header;
