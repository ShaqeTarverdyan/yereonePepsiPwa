import React from 'react';
import defaultClasses from './reviewContent.css';
import { mergeClasses } from '../../classify';
import Rating from '../Rating';
import ReviewForm from './reviewForm';


const ReviewContent = props => {
    const { reviews, productId,availableRatings } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.reviews}>
                {
                    reviews.map((review, index) =>
                        <div key={index} className={classes.content}>
                            {
                                review.ratings.map((rating, index) =>
                                    <Rating key={index} ratingSummary={rating.percent} />
                                )
                            }
                          
                                <span className={classes.nickname}>{review.nickname} / </span>
                                <span className={classes.createdAt}>{review.created_at}</span>
                         
                            <p className={classes.detail}>{review.detail}</p>
                        </div>
                    )
                }
            </div>
            <ReviewForm productId={productId} availableRatings={availableRatings}/>
        </div>
    );
}

export default ReviewContent;