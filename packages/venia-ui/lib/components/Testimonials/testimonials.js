import React, { useEffect } from 'react';
import { useQuery } from '@magento/peregrine';
import TestimonialQuery from '../../queries/getTestimonials.graphql';
import defaulClasses from './testimonials.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const Testimonials = props => {
    const classes = mergeClasses(defaulClasses, props.classes);

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
                    data.testimonials.items.map((item, index) =>
                        <Slide index={index} key={index} >
                            <div className={classes.testimonial} >
                                <div className={classes.image}>
                                    <img src={item.image} alt={item.author} />
                                </div>
                                <div className={classes.text}>
                                    <p >{item.testimonial_content}</p>
                                </div>
                                <div className={classes.name}>{item.author}</div>
                                <div className={classes.position}> {item.job}</div>
                            </div>
                        </Slide>
                    )
                }
            </Slider>
        </CarouselProvider>
    ) : <div> fetching Data ...</div>

}

export default Testimonials;

