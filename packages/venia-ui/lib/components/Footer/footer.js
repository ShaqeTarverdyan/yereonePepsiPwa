import React from 'react';
import classify from '../../classify';
import defaultClasses from './footer.css';

import Left from './left';
import Right from './right';
import Middle from './middle';

const Footer = props => {
    const { classes } = props;

    return (
        <footer className={classes.root}>
            <div className={classes.content}>
                <Left />
                <Middle />
                <Right />
            </div>
        </footer>
    );
}

export default classify(defaultClasses)(Footer);
