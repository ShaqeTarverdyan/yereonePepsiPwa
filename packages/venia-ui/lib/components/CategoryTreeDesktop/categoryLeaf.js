import React from 'react';
import { shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import { Link, resourceUrl } from '../../drivers';
import defaultClasses from './categoryLeaf.css';

const suffix = '.html';

const Leaf = props => {
    const { category } = props;
    const { name, url_path } = category;
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <li className={classes.root}>
            <Link
                className={classes.target}
                to={resourceUrl(`/${url_path}${suffix}`)}
            >
                <span className={classes.text}>{name}</span>
            </Link>
        </li>
    );
};

export default Leaf;

Leaf.propTypes = {
    category: shape({
        name: string.isRequired,
        url_path: string.isRequired
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
};
