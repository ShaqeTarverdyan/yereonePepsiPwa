import React from 'react';
import defaultClasses from './sidebar.css';
import { mergeClasses } from '../../classify';
import CouponCode from './couponCode';
import TotalsSummary from './totalsSummary';
import Button from '../Button';

const Sidebar = props => {
    const { currencyCode, numItems, subtotal, totalSegments, cart, getCartDetails } = props
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <CouponCode cart={cart} getCartDetails={getCartDetails}/>
            <TotalsSummary
                currencyCode={currencyCode}
                numItems={numItems}
                subtotal={subtotal}
                totalSegments={totalSegments}
            />
            <Button type="submit" priority="high">
                {`Proceed to checkout`}
            </Button>
        </div>
    );
}

export default Sidebar;
