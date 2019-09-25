import React from 'react';
import { Query } from 'src/drivers';
import TestimonialQuery from '../../queries/getTestimonials.graphql';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import defaulClasses from './testimonials.css';
import { mergeClasses } from '../../classify';

const Testimonials = props => {
    const classes = mergeClasses(defaulClasses, props.classes);
    return (
        <div>
            <Query query={TestimonialQuery}>
                {({ loading, error, data }) => {
                    if (error) {
                        return (
                            <span>
                                Data Fetch Error:{' '}
                                <pre>{error.message}</pre>
                            </span>
                        );
                    }
                    if (loading) return <span>Fetching Data</span>
                    const { items } = data.testimonials;
                    return (
                        <OwlCarousel
                            className="owl-theme"
                            loop
                            margin={10}
                        >
                            {
                                data && typeof (items) != 'undefined' ? items.map(item =>
                                    <div className={classes.testimonial} key={item.id}>
                                        <div className={classes.image}>
                                            <img src={item.image} alt={item.author} />
                                        </div>
                                        <div className={classes.text}>
                                            <p >{item.testimonial_content}</p>
                                        </div>
                                        <div className={classes.name}>{item.author}</div>
                                        <div className={classes.position}> {item.job}</div>
                                    </div>

                                ) : <div> fetching Data ...</div>
                            }
                        </OwlCarousel>
                    )
                }}
            </Query>
        </div>
    );
}

export default Testimonials;