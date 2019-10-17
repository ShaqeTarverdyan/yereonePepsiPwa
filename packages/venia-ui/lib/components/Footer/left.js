import React from 'react';
import Logo from '../Logo';
import defaultClasses from './footer.css';
import { mergeClasses } from '../../classify';

const Left = props => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.leftRoot}>
            <div className={classes.leftImg}>
                <Logo />
            </div>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
            </p>
        </div>
    );
}

export default Left;