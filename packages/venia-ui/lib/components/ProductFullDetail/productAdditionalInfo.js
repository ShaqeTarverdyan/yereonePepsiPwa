import React from 'react';
import defaultClasses from './ProductAdditionalInfo.css';
import { mergeClasses } from '../../classify';


const ProductAdditionalInfo = props => {
    const { attributes } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <table className={classes.infoTable}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    attributes.map((attribute, index) =>
                        attribute.attribute_value ?
                            <tr key={index}>
                                <td>{attribute.attribute_label}</td>
                                <td>{attribute.attribute_value}</td>
                            </tr> : ''
                    )
                }
            </tbody>
        </table>
    );
}
export default ProductAdditionalInfo;