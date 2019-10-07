import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import classify from '../../classify';
import defaultClasses from './quantity.css';

class Quantity extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        items: arrayOf(
            shape({
                value: number
            })
        )
    };

    static defaultProps = {
        selectLabel: "product's quantity"
    };

    render() {
        const { classes, ...restProps } = this.props;

        return (
            <div className={classes.root}>
               <div >
                   {restProps.initialValue}
               </div>
            </div>
        );
    }
}

export default classify(defaultClasses)(Quantity);
