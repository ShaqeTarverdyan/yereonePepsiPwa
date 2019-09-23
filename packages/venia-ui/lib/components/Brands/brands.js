import React, { createRef } from 'react';
import { Query } from '@magento/venia-drivers';
import getBrands from '../../queries/getBrands.graphql';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import defaultClasses from './brands.css';
import { mergeClasses } from '../../classify';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Brands = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const ref = createRef();
    return (
        <div className={classes.root}>
            <Query query={getBrands}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data fetch error ...</div>
                    if (loading) return fullPageLoadingIndicator;
                    const brands = data.brands;

                    return (
                        <div className={classes.content}>
                            <button onClick={() => ref.current.prev()}>
                                <span className={classes.iconLeft} />
                            </button>
                                <OwlCarousel
                                    className="owl-theme owl-nav"
                                    items={5}
                                    margin={5}
                                    loop
                                    ref={ref}
                                >
                                    {
                                        brands.map(item =>
                                            <div key={item.id} className={classes.brand}>
                                                <img src={item.logo} alt='brands' />
                                            </div>
                                        )
                                    }
                                </OwlCarousel>

                            <button onClick={() => ref.current.next()}>
                                <span className={classes.iconNext} />
                            </button>
                        </div>
                    )
                }}
            </Query>
        </div>
    );
}

export default Brands;