import React, { useEffect, createRef } from 'react';
import { useQuery } from '@magento/peregrine';
import getProducts from '../../queries/getProducts.graphql';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import defaultClasses from './productCarousel.css';
import { mergeClasses } from '../../classify';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import GalleryItem from '../Gallery/item';


const ProductCarousel = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    const { id, pageSize, currentPage, item, addItemToCart } = props;
    const [queryResult, queryApi] = useQuery(getProducts);
    const { data, error, loading } = queryResult;
    const { runQuery, setLoading } = queryApi;

    useEffect(() => {
        setLoading(true);
        runQuery({
            variables: {
                currentPage: Number(currentPage),
                id: Number(id),
                idString: String(id),
                onServer: false,
                pageSize: Number(pageSize)
            }
        });
    }, [currentPage, id, pageSize, runQuery, setLoading]);


    if (error && !loading) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Data Fetch Error</div>;
    }

    const ref = createRef();
    return data && typeof (data.products.items) != 'undefined' ? (
        <div className={classes.root}>
            <button onClick={() => ref.current.prev()}>
                <span className={classes.iconLeft} />
            </button>
            <OwlCarousel
                className="owl-theme owl-nav"
                items={item}
                margin={5}
                loop
                ref={ref}
            >
                {
                    data.products.items.map(product =>
                        <div className={classes.product} key={product.id} >
                            <GalleryItem
                                item={product}
                                addItemToCart={addItemToCart}  
                            />
                        </div>
                    )
                }

            </OwlCarousel>
            <button onClick={() => ref.current.next()}>
                <span className={classes.iconNext} />
            </button>
        </div>
    ) : fullPageLoadingIndicator;

}




export default ProductCarousel;