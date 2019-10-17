import React, { useEffect } from 'react';
import { useQuery } from '@magento/peregrine';
import TestimonialQuery from '../../queries/getTestimonials.graphql';
import defaulClasses from './testimonials.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useWindowSize } from '@magento/peregrine';
import Rating from '../Rating';
import { resourceUrl } from '@magento/venia-drivers';


const Testimonials = props => {
    const classes = mergeClasses(defaulClasses, props.classes);
    
    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 501;
    const slides = isDesktop ? 3 : 1
    const [queryResult, queryApi] = useQuery(TestimonialQuery);
    const { data, error, loading } = queryResult;
    const { runQuery, setLoading } = queryApi;

    useEffect(() => {
        setLoading(true);
        runQuery({ variables: {} });
    }, [setLoading, runQuery]);

    if (error && !loading) {
        return <div>Data Fetch Error</div>;
    }

    return data && typeof (data) != 'undefined' ? (
        <CarouselProvider
            naturalSlideWidth={480}
            naturalSlideHeight={500}
            totalSlides={3}
            visibleSlides={slides}
            orientation="horizontal"
            dragEnabled={true}
            touchEnabled={true}
            playDirection="forward"
        >
            <Slider>
                {
                    data.testimonials.items.map((item, index) =>
                        <Slide index={index} key={index} >
                            <div className={classes.testimonial} >
                                <div className={classes.image}>
                                    <img src={resourceUrl(item.image_path, {
                                        type: 'image-testimonial',
                                        width: 100,
                                        height: 100
                                    })} alt={item.author} />
                                </div>
                                <div className={classes.testimonialRating}>
                                    <Rating ratingSummary={item.rating} />
                                </div>
                                <div className={classes.text}>
                                    <p >{item.testimonial_content}</p>
                                </div>
                                <div className={classes.information}>
                                    <span>
                                        {item.author}
                                    </span>
                                    <span className={classes.job}>{item.job}</span>
                                </div>
                            </div>
                        </Slide>
                    )
                }
            </Slider>
        </CarouselProvider>
    ) : <div> fetching Data ...</div>

}

export default Testimonials;

