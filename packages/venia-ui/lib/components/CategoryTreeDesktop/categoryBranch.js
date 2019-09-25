import React from 'react';
import {  number, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './categoryBranch.css';
import CategoryTree from './categoryTreeDesktop';
const Branch = props => {
    const { category } = props;
    const { id, include_in_menu, name, level, label } = category;
    const classes = mergeClasses(defaultClasses, props.classes);
    const positionLevel = `level_${level}`;
    const labelStyle = label === 'sale' ? classes.labelSale : classes.labelNew;
    const menuLabel = label != null ? <div className={labelStyle}>{label}</div> : null;
    // `include_in_menu` is undefined when Magento <= 2.3.1
    if (include_in_menu === 0) {
        return null;
    }
    const icon = level > 2 ? classes.iconAngleRight : classes.iconDownOpenMini
    return (
        <li className={classes.root}>
            <div className={classes.target}>
                <span className={classes.text}>{name}</span>
                <span className={icon} style={{paddingTop:'10px'}}/>
            </div>
            <div>{menuLabel}</div>
            <div className={`${defaultClasses.branch} ${defaultClasses[positionLevel]}`}>
               <CategoryTree  categoryId={id}/>
            </div>
        </li>
    );
};

export default Branch;

Branch.propTypes = {
    category: shape({
        id: number.isRequired,
        include_in_menu: number,
        name: string.isRequired
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string
    }),
};
