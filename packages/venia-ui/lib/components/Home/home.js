import React from 'react';
import Banner from '../Banner';
import { mergeClasses } from '../../classify';
import defaultClasses from './home.css';
import Slider from '../Slider';
import Features from '../Features';
import Brands from '../Brands';
import ProductCarousel from '../ProductCarousel';
import Testimonials from '../Testimonials';
import { useWindowSize } from '@magento/peregrine';

const Home = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 993;
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.slider}>
                    <Slider id={3} />
                </div>
                <div className={classes.banner}>
                    <div className={classes.bannerTop}>
                        <Banner id={5} classes={defaultClasses} />
                        <button>Buy Now</button>
                    </div>
                    <div className={classes.bannerDown}>
                        <Banner id={4} classes={defaultClasses} />
                        <Banner id={3} classes={defaultClasses} />
                    </div>
                </div>
            </div>
            <div className={classes.features}>
                <div className={classes.featureContent}>
                    <Features />
                </div>
            </div>
            <div className={classes.carouselWrapper} style={{ marginTop: isMobile ? '25px' : '81px'}}>
                <h1>FEATURED PRODUCTS</h1>
                <ProductCarousel
                    id={6}
                    pageSize={6}
                    currentPage={1}
                />
            </div>
            <div className={classes.carouselWrapper} style={{ marginTop: isMobile ? '60px' : '-30px'}}>
                <h1>CONFIGURABLE PRODUCTS</h1>
                <ProductCarousel
                    id={6}
                    pageSize={6}
                    currentPage={1}
                />
            </div>
            <div className={classes.brands}>
                <h1>PRODUCT BRANDS</h1>
                <Brands />
            </div>
            <div className={classes.testimonials}>
                <h1>Testimonials</h1>
                <Testimonials />
            </div>
        </div>
    );
}

export default Home;
