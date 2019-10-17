import React, { useEffect } from 'react';
import { func, number, shape, string } from 'prop-types';
import CartCounter from './cartCounter';
import { mergeClasses } from '../../classify';
import defaultClasses from './cartTrigger.css';
import { useWindowSize } from '@magento/peregrine';

const CartTrigger = props => {
    const { cart, getCartDetails, toggleCart } = props;
    const { details: cartDetails } = cart;
    const { items_qty: numItems } = cartDetails;
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 500;

    useEffect(() => {
        getCartDetails();
    }, [getCartDetails]);

    const buttonAriaLabel = `Toggle mini cart. You have ${numItems} items in your cart.`;
    const isDesabled = isMobile ? false : true;
    return (
        <button
            type='button'
            disabled={isDesabled}
            className={classes.root}
            aria-label={buttonAriaLabel}
            onClick={toggleCart}
        >
            <span className={classes.iconCart}/>
            <CartCounter numItems={numItems} />
        </button>
    );
};

CartTrigger.propTypes = {
    cart: shape({
        details: shape({
            items_qty: number
        }).isRequired
    }).isRequired,
    classes: shape({
        root: string
    }),
    getCartDetails: func.isRequired,
    toggleCart: func
};

export default CartTrigger;
