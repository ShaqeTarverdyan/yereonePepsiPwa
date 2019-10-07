import React, { useState } from 'react';
import defaultClasses from './rate.css';
import classify from '../../classify';


const Rate = props => {
    const { getRateOptionId, availableRatings} = props;
    const [rating, setRating] = useState(null);
    const [tempRating, setTempRating] = useState(null);
    const handleMouseover = (rating) => {
        setTempRating(rating)
    }
    const handleMouseout = () => {
        setRating(tempRating)
    }

    const rate = (rating) => {
        setRating(rating);
        setTempRating(rating)
        const currentOtion = availableRatings[0].options.filter(option => rating === option.value);
        getRateOptionId(currentOtion[0].option_id)
    }
    const { classes } = props;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        let starClass = classes.ratingEmpty;
        if (rating >= i && rating !== null) {
            starClass = classes.ratingFilled;
        }
        stars.push(
            <i
                key={i}
                className={starClass}
                onMouseOver={() => handleMouseover(i)}
                onClick={() => rate(i)}
                onMouseOut={() => handleMouseout()}
            />
        );
    }
    return <div className={classes.stars}>{stars}</div>;
}


export default classify(defaultClasses)(Rate);