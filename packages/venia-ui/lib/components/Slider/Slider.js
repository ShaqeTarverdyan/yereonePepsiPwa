import React, { useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import SLIDER_QUERY from '../../queries/getSlider.graphql';
import { useQuery } from '@magento/peregrine';
import defaultClasses from './Slider.css';
import classify from '../../classify';
import anim from './anim.scss';

const Slider = props => {
    const { id, classes } = props;
    const [queryResult, queryApi] = useQuery(SLIDER_QUERY);
    const { data } = queryResult;
    const { runQuery } = queryApi;

    useEffect(() => {
        if (data === null) {
            runQuery({ variables: { id: id } });
        }
    }, []);
console.log('data', data)
    return (
        (data !== null && data.slider.slides) ?
            <AwesomeSlider 
                className={classes.slideStyle} 
                bullets={false}
                cssModule={anim}
            >
                {
                    data.slider.slides.map(slide =>
                        <div key={slide.id} data-src={slide.imageUrl}>
                            <p>DRINK</p>
                            <h1>PEPSI</h1>
                            <h3>{slide.title}</h3>
                        </div>
                    )
                }
            </AwesomeSlider>
            : <div>fetching data ...</div>
    );
}

export default classify(defaultClasses)(Slider);