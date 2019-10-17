import React, { Suspense } from 'react';
import { bool, func, object, shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';
import NavigationDesktop from '../NavigationDesktop';
import MiniCartDesktop from '../MiniCartDesktop';
import miniCartMobile from '../MiniCart';
import Icon from '../Icon';
import { Menu as MenuIcon} from 'react-feather';
import SearchTrigger from './searchTrigger';



import UserTrigger from './userTrigger';
import HeaderTop from './HeaderTop';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';

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
                <div className={classes.menuMobile}>
                    <NavTrigger>
                        <Icon src={MenuIcon} />
                    </NavTrigger>
                </div>
                <div >
                    <div className={classes.logo}>
                        <Link to={resourceUrl('/')} >
                            <Logo />
                        </Link>
                        <OnlineIndicator hasBeenOffline={hasBeenOffline} isOnline={isOnline}/>
                    </div>
                </div>
                <div className={classes.actions}>
                    <div className={classes.searchDesktop}>
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
                    <div className={classes.searchMobile}>
                        <SearchTrigger searchOpen={searchOpen} toggleSearch={toggleSearch}>
                            <span className={classes.iconSearch} />
                        </SearchTrigger>
                    </div>
                    <div className={classes.userTrigger}>
                        <UserTrigger startRegister={startRegister} classes={defaultClasses} />
                    </div>
                    <div className={classes.cart}>
                        <div className={classes.cartTrigger}>
                            <CartTrigger {...cartTriggerProps} />
                        </div>
                        <div className={classes.miniCartDesktop}>
                            <MiniCartDesktop isOpen={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.menuDesktop}>
                <NavigationDesktop />
            </div>
            <Suspense fallback={searchOpen ? suspenseFallback : null}>
                <Route
                    render={({ history, location }) => (
                        <SearchBar
                            isOpen={searchOpen}
                            history={history}
                            location={location}
                        />
                    )}
                />
            </Suspense>
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
