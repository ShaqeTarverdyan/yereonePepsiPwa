import React from 'react';
import { Query } from '@magento/venia-drivers';
import getBrands from '../../queries/getBrands.graphql';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import defaultClasses from './brands.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Brands = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
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
                                naturalSlideWidth={100}
                                naturalSlideHeight={80}
                                totalSlides={6}
                                visibleSlides={4}
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
                                                    <img src={brand.logo} alt='brands' />
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