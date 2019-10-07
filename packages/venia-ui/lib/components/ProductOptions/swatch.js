import React, { Component } from 'react';
import { bool, number, object, oneOfType, shape, string } from 'prop-types';

import classify from '../../classify';
import Tooltip from './toolTip';

import defaultClasses from './swatch.css';


const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

class Swatch extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        hasFocus: bool,
        isSelected: bool,
        item: shape({
            label: string.isRequired,
            value_index: oneOfType([number, string]).isRequired
        }).isRequired,
        itemIndex: number,
        style: object
    };

    static defaultProps = {
        hasFocus: false,
        isSelected: false
    };

    render() {
        const { props } = this;
        const {
            classes,
            hasFocus,
            isSelected,
            item,
            // eslint-disable-next-line
            itemIndex,
            ...restProps
        } = props;
        const selectedClass = isSelected ? classes.wrappedDiv : null
        const className = classes[getClassName('root', isSelected, hasFocus)];
        const { label, swatch_data } = item;


        const colorStyle = {
            backgroundColor: swatch_data.value
        }
        return (
            <Tooltip text={label}>
                <div className={selectedClass}>
                    <div 
                        {...restProps}
                        className={className}
                        style={colorStyle}
                        title={label}
                    />
                </div>


            </Tooltip>
        );
    }
}

export default classify(defaultClasses)(Swatch);
