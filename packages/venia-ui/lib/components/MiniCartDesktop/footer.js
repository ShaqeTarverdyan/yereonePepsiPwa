import React, { Suspense } from 'react';
import { bool, number, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Checkout from '../Checkout';
import CheckoutButton from '../Checkout/checkoutButton';
import Button from '../Button';
import defaultClasses from './footer.css';
import TotalsSummary from './totalsSummary';
import { Link, resourceUrl } from '@magento/venia-drivers';

const Footer = props => {
    const {
        cart,
        currencyCode,
        isMiniCartMaskOpen,
        numItems,
        subtotal,
        isCartEmpty
    } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const footerClassName = isMiniCartMaskOpen
        ? classes.root_open
        : classes.root;
    const placeholderButton = (
        <div className={classes.placeholderButton}>
            <CheckoutButton disabled={true} />
        </div>
    );

    return (
        <div className={footerClassName}>
            <TotalsSummary
                currencyCode={currencyCode}
                numItems={numItems}
                subtotal={subtotal}
            />
            <div className={classes.buttonGroup}>
                <Link to="/cart">
                    <Button priority="normal" disabled={isCartEmpty}>
                        <span>View CArt</span>
                    </Button>
                </Link>

                <Button priority="high">
                    <span>Checkout</span>
                </Button>
            </div>
        </div>
    );
};


Footer.propTypes = {
    cart: object,
    classes: shape({
        placeholderButton: string,
        root: string,
        root_open: string,
        summary: string
    }),
    currencyCode: string,
    isMiniCartMaskOpen: bool,
    numItems: number,
    subtotal: number
};

export default Footer;
