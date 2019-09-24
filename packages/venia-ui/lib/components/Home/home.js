import React from 'react';
import Banner from '../Banner';
import { mergeClasses } from '../../classify';
import defaultClasses from './home.css';
import Slider from '../Slider';
import Features from '../Features';
import Brands from '../Brands';
import ProductCarousel from '../ProductCarousel';
import Testimonials from '../Testimonials';

const Home = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.slide}>
                    <Slider id={2} />
                </div>
                <div className={classes.banner}>
                    <div className={classes.bannerTop}>
                        <Banner id={1} classes={defaultClasses} />
                        <button>Buy Now</button>
                    </div>
                    <div className={classes.bannerDown}>
                        <Banner id={2} classes={defaultClasses} />
                        <Banner id={2} classes={defaultClasses} />
                    </div>
                </div>
            </div>
            <div className={classes.features}>
                <div className={classes.featureContent}>
                    <Features />
                </div>
            </div>
            <div className={classes.productCarousel}>
                <h1>FEATURED PRODUCTS</h1>
                <ProductCarousel
                    id={6}
                    pageSize={6}
                    currentPage={1}
                    item={4}
                />
            </div>
            <div className={classes.productCarousel}>
                <h1>CONFIGURABLE PRODUCTS</h1>
                <ProductCarousel
                    id={12}
                    pageSize={6}
                    currentPage={1}
                    item={4}
                />
            </div>
            <div className={classes.brands}>
                <h1>PRODUCT BRANDS</h1>
                <Brands />
            </div>
            <div className={classes.testimonials}>
                <Testimonials />
            </div>
        </div>
    );
}

export default Home;
