import React from 'react';
import defaultClasses from './HeaderTop.css';
import { mergeClasses } from '../../../classify';


const HeaderTop = props =>  {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.phoneNumber}>
                    Call: (888) 1900 86420
                </div>
                <div className={classes.text}>
                    Huge sale discount weekend up 70%! Shop now
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;