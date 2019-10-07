import React, { useCallback, useMemo } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { useCarousel } from '@magento/peregrine';
import { resourceUrl } from '@magento/venia-drivers';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';
import { mergeClasses } from '../../classify';
import defaultClasses from './carousel.css';
import { transparentPlaceholder } from '../../shared/images';


const DEFAULT_IMAGE_WIDTH = 640;
const DEFAULT_IMAGE_HEIGHT = 600;

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, Dot, DotGroup, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { images } = props;
    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>

                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={images.length}
                    touchEnabled
                    dragEnabled
                    visibleSlides={1}
                    hasMasterSpinner={true}
                    orientation="horizontal"
                    className={classes.carouselProvider}
                >
                    <Slider className={classes.slider}>
                        {
                            images.map((image, index) =>
                                <Slide index={index} key={index}>
                                    <ImageWithZoom
                                        src={resourceUrl(image.file, {
                                            type: 'image-product',
                                            width: DEFAULT_IMAGE_WIDTH,
                                            height: DEFAULT_IMAGE_HEIGHT
                                        })}
                                        alt='productImage'
                                        // hasMasterSpinner
                                    />
                                </Slide>
                            )
                        }
                    </Slider>
                    <div className={classes.thumbnails}>
                        {
                            images.map((image, index) =>
                                <Dot
                                    key={index}
                                    children={<Image src={resourceUrl(image.file, {
                                        type: 'image-product',
                                        width: 100,
                                        height: 140
                                    })} />}
                                    slide={index}
                                    className={classes.thumbnail}
                                />
                            )
                        }
                    </div>

                    <div className={classes.buttonGroup}>
                        <ButtonBack className={classes.leftIcon} />
                        <ButtonNext className={classes.rigthIcon} />
                    </div>
                </CarouselProvider>
            </div>
        </div>
    );
};

Carousel.propTypes = {
    classes: shape({
        currentImage: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ).isRequired
};

export default Carousel;
