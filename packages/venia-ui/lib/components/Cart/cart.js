import React from 'react';
import { arrayOf, bool, func, number, object, shape, string } from 'prop-types';

import Content from './content';
import Sidebar from './sidebar';
import defaultClasses from './cart.css';
import { mergeClasses } from '../../classify';
import getCurrencyCode from '../../util/getCurrencyCode';

const Cart = props => {
    // Props.
    const {
        beginEditItem,
        cart,
        closeDrawer,
        endEditItem,
        isCartEmpty,
        removeItemFromCart,
        updateItemInCart,
        getCartDetails
    } = props;
    const { editItem, isEditingItem, isLoading, isUpdatingItem, totals } = cart;
    const { total_segments } = totals;
    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);
    const currencyCode = getCurrencyCode(cart);
    const cartItems = cart.details.items;
    const numItems = cart.details.items_qty;
    const subtotal = cart.totals.subtotal;
    return (
        <aside className={classes.root}>
            <Content
                beginEditItem={beginEditItem}
                cartItems={cartItems}
                closeDrawer={closeDrawer}
                currencyCode={currencyCode}
                editItem={editItem}
                endEditItem={endEditItem}
                isCartEmpty={isCartEmpty}
                isEditingItem={isEditingItem}
                isLoading={isLoading}
                isUpdatingItem={isUpdatingItem}
                removeItemFromCart={removeItemFromCart}
                updateItemInCart={updateItemInCart}
                totals={totals}
            />
            <Sidebar
                currencyCode={currencyCode}
                numItems={numItems}
                subtotal={subtotal}
                totalSegments={total_segments}
                cart={cart}
                getCartDetails={getCartDetails}
            />
        </aside>
    );
};

Cart.propTypes = {
    beginEditItem: func.isRequired,
    cancelCheckout: func,
    cart: shape({
        details: shape({
            currency: shape({
                quote_currency_code: string
            }),
            items: arrayOf(
                shape({
                    item_id: number,
                    name: string,
                    price: number,
                    product_type: string,
                    qty: number,
                    quote_id: string,
                    sku: string
                })
            ),
            items_qty: number
        }).isRequired,
        editItem: object,
        isEditingItem: bool,
        isLoading: bool,
        isUpdatingItem: bool,
        totals: shape({
            subtotal: number
        }).isRequired
    }).isRequired,
    classes: shape({
        header: string,
        root: string,
        root_open: string,
        title: string
    }),
    closeDrawer: func,
    endEditItem: func.isRequired,
    isCartEmpty: bool,
    isMiniCartMaskOpen: bool,
    isOpen: bool,
    removeItemFromCart: func,
    updateItemInCart: func
};

export default Cart;
