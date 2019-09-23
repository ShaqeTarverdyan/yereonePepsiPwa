import React from 'react';
import defaultClasses from './footer.css';
import { mergeClasses } from '../../classify';

const Middle = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.middleRoot}>
            <div>
                <h1>SHOP</h1>
                <ul>
                    <li> New Collection</li>
                    <li> Product</li>
                    <li> Latest news</li>
                </ul>
            </div>
            <div>
                <h1>ABOUT US</h1>
                <ul>
                    <li> New Collection</li>
                    <li> Product</li>
                    <li> Latest news</li>
                    <li> Product</li>
                </ul>
            </div>
        </div>
    );
}

export default Middle;