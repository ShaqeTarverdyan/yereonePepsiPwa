import React, { useEffect } from 'react';
import { useQuery } from '@magento/peregrine';
import getProducts from '../../queries/getProducts.graphql';
import defaultClasses from './productCarousel.css';
import { mergeClasses } from '../../classify';
import GalleryItem from '../Gallery/item';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useWindowSize } from '@magento/peregrine';

const ProductCarousel = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    const { id, pageSize, currentPage, addItemToCart } = props;
    const [queryResult, queryApi] = useQuery(getProducts);
    const { data, error, loading } = queryResult;
    const { runQuery, setLoading } = queryApi;
    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 501;

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
    const mapGalleryItem = (item) => {
        const { small_image } = item;
        return {
            ...item,
            small_image:
                typeof small_image === 'object' ? small_image.url : small_image
        };
    }
    const slides = isDesktop ? 4 : 2;
    return data && typeof (data.products.items) != 'undefined' ? (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={295}
                naturalSlideHeight={500}
                totalSlides={6}
                visibleSlides={slides}
                orientation="horizontal"
                dragEnabled={true}
                touchEnabled={true}
                playDirection="forward" 
            >
                <Slider >
                    {
                        data.products.items.map((product, index) =>
                            <Slide index={index} key={index} className={classes.imageWrapper}>
                                <GalleryItem
                                    item={mapGalleryItem(product)}
                                    addItemToCart={addItemToCart}
                                />
                            </Slide>
                        )
                    }
                </Slider>
            </CarouselProvider>
        </div>
    ) : <div> Loading ... </div>

}




export default ProductCarousel;