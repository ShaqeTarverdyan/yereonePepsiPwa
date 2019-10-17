import React, { useEffect } from 'react';
import 'react-awesome-slider/dist/styles.css';
import SLIDER_QUERY from '../../queries/getSlider.graphql';
import { useQuery } from '@magento/peregrine';
import defaultClasses from './Slider.css';
import classify from '../../classify';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { resourceUrl } from '@magento/venia-drivers';


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
                    naturalSlideWidth={610}
                    naturalSlideHeight={778}
                    totalSlides={2}
                    orientation="horizontal"
                >
                    <Slider className={classes.slider}>
                        {
                            data.slider.slides.map((slide, index, ) =>
                                <Slide
                                    index={index}
                                    key={index}
                                    classNameHidden={classes.notVisible}
                                    classNameVisible={classes.visible}
                                >
                                    <div>
                                        <img
                                            src={slide.image_url}
                                            alt='name'
                                            srcSet={`
                                            ${resourceUrl(slide.image_url, {
                                                type: 'image-slide',
                                                width: 768,
                                                height: 936
                                            })} 768w,
                                            ${resourceUrl(slide.image_url, {
                                                type: 'image-slide',
                                                width: 610,
                                                height: 778,
                                            })} 1024w
                                        `}
                                            sizes="(min-width: 768px) 609px 100vw"
                                        />
                                    </div>

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