import React, { Component, Suspense } from 'react';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { string, number, shape, oneOfType, object } from 'prop-types';
import { connect } from '@magento/venia-drivers';
import { compose } from 'redux';
import { Price } from '@magento/peregrine';
import classify from '../../classify';
import { transparentPlaceholder } from '../../shared/images';
import defaultClasses from './item.css';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
const Options = React.lazy(() => import('../ProductOptions'));
import appendOptionsToPayload from '../../util/appendOptionsToPayload';
import isProductConfigurable from '../../util/isProductConfigurable';
import Rating from '../Rating';
import Button from '../Button';


// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const imageWidth = '280';
const imageHeight = '371';


const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();

const deriveOptionCodesFromProduct = item => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(item)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attribute_id,
        attribute_code
    } of item.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }

    return initialOptionCodes;
};

const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!isProductConfigurable(product)) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options } = product;
    const numProductOptions = (typeof (configurable_options) != 'undefined') ? configurable_options.length : null
    const numProductSelections = optionSelections.size;
    return numProductSelections < numProductOptions;
};
const ItemPlaceholder = ({ children, classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>{children}</div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '.html';

class GalleryItem extends Component {
    static propTypes = {
        classes: shape({
            image: string,
            image_pending: string,
            imagePlaceholder: string,
            imagePlaceholder_pending: string,
            images: string,
            images_pending: string,
            name: string,
            name_pending: string,
            price: string,
            price_pending: string,
            root: string,
            root_pending: string
        }),
        item: shape({
            id: number.isRequired,
            name: string.isRequired,
            small_image: oneOfType([object, string]).isRequired,
            url_key: string.isRequired,
            price: shape({
                regularPrice: shape({
                    amount: shape({
                        value: number.isRequired,
                        currency: string.isRequired
                    }).isRequired
                }).isRequired
            }).isRequired
        })
    };
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isAddingToCart: false,
            isAddedToCart: false,
            optionSelections: INITIAL_OPTION_SELECTIONS,
            optionCodes: null

        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.isAddingItem === true &&
            this.props.isAddingItem === false &&
            this.state.isAddingToCart === true
        ) {
            this.setState({
                isAddedToCart: true,
                isAddingToCart: false
            });
            setTimeout(() => {
                this.setState({
                    isAddingToCart: false,
                    isAddedToCart: false
                })
            }, 4000);
        }
    }
    optionCodes = () => {
        this.setState({ optionCodes: deriveOptionCodesFromProduct(this.props.item) })
    }

    render() {
        const { classes, item, addItemToCart } = this.props;
        const { quantity, isAddingToCart, isAddedToCart, optionSelections } = this.state;
        const isMissingOptions = getIsMissingOptions(item, optionSelections);
        const handleSelectionChange = (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const newOptionSelections = new Map([...optionSelections]);
            newOptionSelections.set(optionId, Array.from(selection).pop());
            this.setState({ optionSelections: newOptionSelections });
        };
        if (!item) {
            return (
                <ItemPlaceholder classes={classes}>
                    {this.renderImagePlaceholder()}
                </ItemPlaceholder>
            );
        }
        const { name, price, url_key, rating_summary } = item;
        const productLink = `/${url_key}${productUrlSuffix}`;
        const newItem = item && item.new === 1 ? <div className={classes.newItem}>New</div> : <div></div>
        const handleAddToCart = () => {
            const payload = {
                item: item,
                productType: item.__typename,
                quantity
            };

            this.setState({
                isAddingToCart: true,
            });


            if (isProductConfigurable(item)) {
                appendOptionsToPayload(payload, this.state.optionSelections, this.optionCode);
            }
            return addItemToCart(payload);
        };
        const optionsClass = isProductConfigurable(item) ? classes.optios : classes.noOptions;
        return (
            <div className={classes.root}>
                <Link to={resourceUrl(productLink)} className={classes.images}>
                    {this.renderImagePlaceholder()}
                    {this.renderImage()}
                </Link>
                <div className={classes.addToCart}>
                    <Button
                        onClick={handleAddToCart}
                        disabled={isMissingOptions}
                        priority="normal"
                    >
                        {isAddingToCart && <div>Adding...</div>}
                        {!isAddingToCart && !isAddedToCart && <div>Add to Cart</div>}
                        {isAddedToCart && <div>Added</div>}
                    </Button>
                </div>
                <div className={classes.content}>
                    <div className={classes.rating}>
                        <Rating
                            ratingSummary={rating_summary}
                        />
                    </div>
                    <Link to={resourceUrl(productLink)} className={classes.name}>
                        <span>{name}</span>
                    </Link>
                    <div className={classes.price}>
                        <Price
                            value={price.regularPrice.amount.value}
                            currencyCode={price.regularPrice.amount.currency}
                        />
                    </div>
                    <div className={optionsClass}>
                        <Suspense fallback={fullPageLoadingIndicator}>
                            <Options
                                onSelectionChange={handleSelectionChange}
                                product={item}
                            />
                        </Suspense>
                    </div>
                </div>
                <div className={classes.newPosition}>
                    {newItem}
                </div>
            </div>
        );
    }

    renderImagePlaceholder = () => {
        const { classes, item } = this.props;

        const className = item
            ? classes.imagePlaceholder
            : classes.imagePlaceholder_pending;

        return (
            <img
                className={className}
                src={transparentPlaceholder}
                alt=""
                width={imageWidth}
                height={imageHeight}
            />
        );
    };

    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const { small_image, name } = item;

        return (
            <img
                className={classes.image}
                src={resourceUrl(small_image, {
                    type: 'image-product',
                    width: imageWidth,
                    height: imageHeight
                })}
                alt={name}
                width={imageWidth}
                height={imageHeight}
                sizes={`${imageWidth}px`}
            />
        );
    };
}
const mapStateToProps = ({ cart }) => {
    const { isAddingItem } = cart;
    return { isAddingItem };

}
export default compose(connect(mapStateToProps)(classify(defaultClasses)(GalleryItem)));