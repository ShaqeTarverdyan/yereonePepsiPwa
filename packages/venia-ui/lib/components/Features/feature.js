import React from 'react';
import defaultClasses from './feature.css';
import { mergeClasses } from '../../classify';


const Feature = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { feature } = props;
    const { image, title, text } = feature;

    return (
        <div className={classes.feature} >
            <img src={image} alt={title} />
            <div >
                <h3>{title}</h3>
                <p> {text}</p>
            </div>
        </div>
    );
}

export default Feature;