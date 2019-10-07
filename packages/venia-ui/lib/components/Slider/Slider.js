import React, { useEffect } from 'react';
import 'react-awesome-slider/dist/styles.css';
import SLIDER_QUERY from '../../queries/getSlider.graphql';
import { useQuery } from '@magento/peregrine';
import defaultClasses from './Slider.css';
import classify from '../../classify';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const SliderComponent = props => {
    const { id, classes } = props;
    const [queryResult, queryApi] = useQuery(SLIDER_QUERY);
    const { data } = queryResult;
    const { runQuery } = queryApi;

    useEffect(() => {
        if (data === null) {
            runQuery({ variables: { id: id } });
        }
    }, []);
    return (
        (data !== null && data.slider.slides) ?
            <div className={classes.slideStyle}>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={100}
                    totalSlides={2}
                    orientation="horizontal"
                >
                    <Slider >
                        {
                            data.slider.slides.map((slide, index, ) =>
                                <Slide 
                                    index={index} 
                                    key={index} 
                                    classNameHidden={classes.notVisible}
                                    classNameVisible={classes.visible}
                                >
                                    <Image src={slide.image_url} alt='name' />
                                    <div className={classes.text} >
                                        <p className={classes.shop}>Shop</p>
                                        <p className={classes.title}>
                                            {slide.title}
                                        </p>
                                    </div>
                                </Slide>
                            )
                        }
                    </Slider>
                    <div className={classes.buttonGroup}>
                        <ButtonBack className={classes.leftIcon} />
                        <ButtonNext className={classes.rigthIcon} />
                    </div>
                </CarouselProvider>
            </div> : <div>fetching data ...</div>
    );
}

export default classify(defaultClasses)(SliderComponent);