import React from 'react';
import defaultClasses from './feature.css';
import { mergeClasses } from '../../classify';


const Feature = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { feature } = props;
    const { icon, title, text } = feature;
    return (
        <div className={classes.feature} >
            <div className={classes.icon}>
                <span className={classes[icon]} />
            </div>
            <div >
                <h3>{title}</h3>
                <p> {text}</p>
            </div>
        </div>
    );
}

export default Feature;