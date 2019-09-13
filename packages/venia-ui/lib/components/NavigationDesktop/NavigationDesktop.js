import React from 'react';
import { mergeClasses } from '../../classify';
import CategoryTreeDesktop from '../CategoryTreeDesktop';
import defaultClasses from './NavigationDesktop.css';

const NavigationDesktop = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <CategoryTreeDesktop
                categoryId={2}
                classes={defaultClasses}
            />
        </div>
    );
};
export default NavigationDesktop;

