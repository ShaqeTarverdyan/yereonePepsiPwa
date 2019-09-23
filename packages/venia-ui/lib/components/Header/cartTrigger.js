import React, { useEffect } from 'react';
import { func, number, shape, string } from 'prop-types';
import shoppingCart from './shopping-cart.png'
import Image from '../Image';
import CartCounter from './cartCounter';
import { mergeClasses } from '../../classify';
import defaultClasses from './cartTrigger.css';


const CartTrigger = props => {
    const { cart, getCartDetails, toggleCart } = props;
    const { details: cartDetails } = cart;
    const { items_qty: numItems } = cartDetails;

    const classes = mergeClasses(defaultClasses, props.classes);

    useEffect(() => {
        getCartDetails();
    }, [getCartDetails]);

    const buttonAriaLabel = `Toggle mini cart. You have ${numItems} items in your cart.`;

    return (
        <button
            type='button'
            disabled
            className={classes.root}
            aria-label={buttonAriaLabel}
            onClick={toggleCart}
        >
            <Image  src={shoppingCart} style={{width:'25px',  height:'25px'}}/>
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
