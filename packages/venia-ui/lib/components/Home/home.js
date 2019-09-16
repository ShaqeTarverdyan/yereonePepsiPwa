import React from 'react';
import Banner from '../Banner';
import { mergeClasses } from '../../classify';
import defaultClasses from './home.css';
import Slider from '../Slider';

const Home = props => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div>
            <div className={classes.bannerStyle}>
                <div className={classes.slide}>
                    <Slider id={2}/>
                </div>
                <div className={classes.banner}>
                    <div className={classes.innerBanner}>
                        <Banner id={1} classes={defaultClasses} />
                        <div className={classes.buttonStyle}>
                            <button>Buy Now</button>
                        </div>

                    </div>
                    <div className={classes.innerBanners}>
                        <Banner id={2} classes={defaultClasses} />
                        <Banner id={2} classes={defaultClasses} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
