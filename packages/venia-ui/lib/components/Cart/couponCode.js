import React, { useCallback, useEffect, useState } from 'react';
import defaultClasses from './couponCode.css';
import { mergeClasses } from '../../classify';
import { Form } from 'informed';
import Field from '../Field';
import TextInput from '../TextInput';
import Button from '../Button';
import { isRequired } from '../../util/formValidators';
import removeCouponFromCart from '../../queries/removeCouponFromCart.graphql';
import applyCouponToCart from '../../queries/applyCouponToCart.graphql';
import { useMutation } from '@magento/peregrine';
import LoadingIndicator from '../LoadingIndicator';
const loadingIndicator = (
    <LoadingIndicator>.</LoadingIndicator>
);

const CouponCode = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { cart, getCartDetails } = props;
    const { cartId, totals } = cart;
    const { grand_total, subtotal, coupon_code } = totals;
    const showForm = grand_total === subtotal;
    const couponCode = coupon_code ? coupon_code : 'no coupon code';

    //applyCouponToCart
    const [applyqueryResult, applyqueryApi] = useMutation(applyCouponToCart);
    const {
        data: couponData,
        error: couponError,
        loading: couponLoading
    } = applyqueryResult;
    const {
        runMutation: applyrunMutation,
        setLoading: applysetLoading
    } = applyqueryApi;
    const applyCoupon =
        ({ couponCode }) => {
            applysetLoading(true);
            applyrunMutation({
                variables: {
                    cart_id: String(cartId),
                    coupon_code: String(couponCode)
                }
            });
        };
    //removeCoupon
    const [removequeryResult, removequeryApi] = useMutation(removeCouponFromCart);
    const {
        data: removedCouponData,
        error: removeError,
        loading: removeLoading
    } = removequeryResult;
    const { runMutation: removeRunMutation, setLoading: removeSetLoading } = removequeryApi;

    const removeCoupon = () => {
        removeSetLoading(true);
        removeRunMutation({
            variables: {
                cart_id: String(cartId)
            }
        });
    };

    useEffect(() => {
        getCartDetails()
    }, [couponData, removedCouponData]);

    return (
        <div className={classes.root}>
            <div>
                <p className={classes.heading}> Discount Code</p>
                {showForm ?
                    <Form
                        className={classes.couponForm}
                        onSubmit={applyCoupon}
                    >
                        <p>Enter the coupon code if you have one.</p>
                        <Field required={true}>
                            <TextInput
                                field="couponCode"
                                autoComplete="couponCode"
                                validate={isRequired}
                                validateOnBlur
                            />
                        </Field>
                        <Button
                            type="submit"
                            priority="normal"
                        >
                            <p>{`Apply Coupon`}</p>
                        </Button>
                    </Form> :
                    <div className={classes.disCard}>
                        <p>{`Coupon Code already applied (${couponCode})`}</p>
                        <Button
                            type="submit"
                            priority="normal"
                            onClick={removeCoupon}
                        >
                            {`Discard `}
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CouponCode;