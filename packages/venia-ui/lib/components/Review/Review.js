import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './Review.css';

const Review = (props) => {
    const { ratingSummary } = props;
        const classes = mergeClasses(defaultClasses, props.classes)
    return  ratingSummary && typeof (ratingSummary) != 'undefined' ? (
        <div className={classes.root}>
            <div className={classes.rating_box}>
                <div 
                    className={classes.rating} 
                    style={{width:`${ratingSummary}%`}}
                />
            </div>
        </div>
    ) : <div></div>;
}

export default Review