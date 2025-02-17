import React from 'react';
import { Switch, Route } from '@magento/venia-drivers';
import { Page } from '@magento/peregrine';
import ErrorView from '../ErrorView/index';
import CreateAccountPage from '../CreateAccountPage/index';
import Search from '../../RootComponents/Search';
import Cart from '../Cart';

const renderRoutingError = props => <ErrorView {...props} />;

const renderRoutes = () => (
    <Switch>
        <Route exact path="/search.html" component={Search} />
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route exact path="/cart" component={Cart} />
        <Route render={() => <Page>{renderRoutingError}</Page>} />
    </Switch>
);


export default renderRoutes;
