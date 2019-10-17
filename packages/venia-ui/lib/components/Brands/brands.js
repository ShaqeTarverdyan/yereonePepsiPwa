import React from 'react';
import { Query } from '@magento/venia-drivers';
import getBrands from '../../queries/getBrands.graphql';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import defaultClasses from './brands.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useWindowSize } from '@magento/peregrine';
import { resourceUrl } from '@magento/venia-drivers';


const Brands = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 993;
    const slides = isMobile ? 2 : 6
    return (
        <div className={classes.root}>
            <Query query={getBrands}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data fetch error ...</div>
                    if (loading) return fullPageLoadingIndicator;
                    const brands = data.brands;
                    return (
                        <div className={classes.content}>
                            <CarouselProvider
                                naturalSlideWidth={200}
                                naturalSlideHeight={200}
                                totalSlides={6}
                                visibleSlides={slides}
                                orientation="horizontal"
                                dragEnabled={true}
                                touchEnabled={true}
                                playDirection="forward"
                            >
                                <Slider>
                                    {
                                        brands.map((brand, index) =>
                                            <Slide index={index} key={index} >
                                                <div key={brand.id} className={classes.brand}>
                                                    <img src={resourceUrl(brand.logo_path, {
                                                        type: 'image-brand',
                                                        width: 100,
                                                        height: 100
                                                     })}
                                                        alt='brands'
                                                    />
                                                </div>
                                            </Slide>
                                        )
                                    }
                                </Slider>
                            </CarouselProvider>
                        </div>
                    )
                }}
            </Query>
        </div>
    );
}

export default Brands;