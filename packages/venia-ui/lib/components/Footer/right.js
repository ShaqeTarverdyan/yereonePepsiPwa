import React from 'react';
import defaultClasses from './footer.css';
import { mergeClasses } from '../../classify';


const Right = props => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.rightRoot}>
            <h1>Contuct US</h1>
            <ul>
                <li>
                    <div className={classes.iconHome} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
                <li>
                    <div className={classes.iconEnvelope} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
                <li>
                    <div className={classes.iconPhone} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
            </ul>
        </div>
    );
}

export default Right;