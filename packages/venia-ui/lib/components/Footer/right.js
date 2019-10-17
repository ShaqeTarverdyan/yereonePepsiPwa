import React from 'react';
import defaultClasses from './footer.css';
import { mergeClasses } from '../../classify';


const Right = props => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.rightRoot}>
            <h1>Contuct US</h1>
            <ul className={classes.rightContent}>
                <li>
                    <span className={classes.iconHome} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
                <li>
                    <span className={classes.iconEnvelope} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
                <li>
                    <span className={classes.iconPhone} />
                    <p>No 40 Baria Street 133/2 New York</p>
                </li>
            </ul>
            <div className={classes.icons}>
                <div> <span className={classes.iconInstagram} /></div>
                <div> <span className={classes.iconFacebook} /></div>
                <div> <span className={classes.iconTwitter} /></div>
            </div>
        </div>
    );
}

export default Right;