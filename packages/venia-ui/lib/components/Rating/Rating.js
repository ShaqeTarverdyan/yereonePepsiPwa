import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './Rating.css';

const Rating = (props) => {
    const { ratingSummary } = props;
    const classes = mergeClasses(defaultClasses, props.classes)


    return  ratingSummary && typeof (ratingSummary) != 'undefined' ? (
        <div className={classes.root}>
            <div className={classes.ratingEmpty}>
                <div 
                    className={classes.ratingFilled} 
                    style={{width:`${ratingSummary}%`}}
                />
            </div>
        </div>
    ) : null;
}

export default Rating