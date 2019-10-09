import React, { useCallback, useMemo, useState } from 'react';
import { array, func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';

import classify from '../../classify';
import { resourceUrl } from '@magento/venia-drivers';
import ProductOptions from './productOptions';
import Image from '../Image';
import { transparentPlaceholder } from '../../shared/images';

import defaultClasses from './product.css';

const imageWidth = 80;
const imageHeight = 100;

const Product = props => {
    const { currencyCode, item, removeItemFromCart, updateItemInCart, classes } = props;
    const { image, name, price, qty, options } = item;

    // const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const productImage = useMemo(() => {
        const src =
            image && image.file
                ? resourceUrl(image.file, {
                    type: 'image-product',
                    width: imageWidth,
                    height: imageHeight
                })
                : transparentPlaceholder;

        return (
            <Image
                alt={name}
                classes={{ root: classes.image }}
                placeholder={transparentPlaceholder}
                src={src}
            />
        );
    }, [image, name, classes.image]);

    const updateQuantity = useCallback((qty) => {
        const payload = {
            item: item,
            productType: item.__typename,
            quantity: qty
        };
        updateItemInCart(payload, item.item_id);
    }, []);
    const handleDecrement = useCallback(() => {
        updateQuantity(qty - 1);
    }, []);

    const handleIncrement = useCallback(() => {
        updateQuantity(qty + 1);
    }, []);


    const handleRemoveItem = useCallback(() => {
        setIsLoading(true);
        // TODO: prompt user to confirm this action?
        removeItemFromCart({ item });
    }, [item, removeItemFromCart]);

    const subTotal = useMemo(() => {
        const total = qty * price;
        return total;
    }, [qty, price])
    return (
        <tr>
            <td>
                <div className={classes.image}>{productImage}</div>
            </td>
            <td>
                <div>
                    {name}
                    <ProductOptions options={options}/>
                </div>
            </td>
            <td>
                <Price currencyCode={currencyCode} value={price} />
            </td>
            <td>

                <div className={classes.quantity}>
                    <button onClick={handleDecrement}><span>-</span></button>
                    <span>{qty}</span>
                    <button onClick={handleIncrement}><span>+</span></button>
                </div>
            </td>
            <td>
                <Price currencyCode={currencyCode} value={subTotal} />
            </td>
            <td>
                <button onClick={handleRemoveItem}>X</button>
            </td>
        </tr>
    );
};

Product.propTypes = {
    beginEditItem: func.isRequired,
    currencyCode: string,
    item: shape({
        image: shape({
            file: string
        }),
        name: string,
        options: array,
        price: number,
        qty: number
    }).isRequired,
    removeItemFromCart: func.isRequired
};

export default classify(defaultClasses)(Product);
