import React, { useCallback } from 'react';
import { array, bool, func, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

import defaultClasses from './content.css';
import ProductList from './productList';

const loadingIndicator = (
    <LoadingIndicator>{`Fetching Cart...`}</LoadingIndicator>
);

const Content = props => {
    // Props.
    const {
        beginEditItem,
        cartItems,
        currencyCode,
        isLoading,
        removeItemFromCart,
        updateItemInCart,
    } = props;

    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);

    // Callbacks.
    const handleEditItem = useCallback(
        item => {
            beginEditItem(item);
        },
        [beginEditItem]
    );

    // Render.
    if (isLoading) {
        return loadingIndicator;
    }

    return (
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th></th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Totalotal</th>
                        <th></th>
                    </tr>
                </thead>
            
                <ProductList
                    beginEditItem={handleEditItem}
                    cartItems={cartItems}
                    currencyCode={currencyCode}
                    removeItemFromCart={removeItemFromCart}
                    updateItemInCart={updateItemInCart}
                />
            </table>
    );
};

Content.propTypes = {
    beginEditItem: func.isRequired,
    cartItems: array,
    classes: shape({
        root: string
    }),
    closeDrawer: func,
    currencyCode: string,
    editItem: object,
    endEditItem: func,
    isCartEmpty: bool,
    isEditingItem: bool,
    isLoading: bool,
    isUpdatingItem: bool,
    removeItemFromCart: func,
    updateItemInCart: func
};

export default Content;
