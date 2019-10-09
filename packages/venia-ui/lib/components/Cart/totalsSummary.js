import React from 'react';
import { number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';
import { mergeClasses } from '../../classify';

import defaultClasses from './totalsSummary.css';
import LoadingIndicator from '../LoadingIndicator';
const loadingIndicator = (
    <LoadingIndicator>{`Fetching Cart...`}</LoadingIndicator>
);
const TotalsSummary = props => {
    // Props.
    const { totalSegments, currencyCode } = props;

    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);

    const bodyInfo = totalSegments && typeof (totalSegments) != 'undefined' ? totalSegments.filter(segment => segment.code != 'grand_total') : null;
    const footerInfo = totalSegments && typeof (totalSegments) != 'undefined' ? totalSegments.filter(segment => segment.code === 'grand_total') : null;
    return totalSegments && typeof (totalSegments) != 'undefined' ? (
        <table className={classes.root}>
            <thead>
                <tr>
                    <th colSpan={2}>Cart Totals</th>
                </tr>
            </thead>
            <tbody>
                {
                    bodyInfo.map((segment, index) =>
                        <tr key={index}>
                            <td>{segment.title}</td>
                            <td><Price currencyCode={currencyCode} value={segment.value}/></td>
                        </tr>
                    )
                }
            </tbody>
            <tfoot>
                <tr>
                    <td>{footerInfo[0].title}</td>
                    <td><Price  currencyCode={currencyCode} value={footerInfo[0].value}/></td>
                </tr>
            </tfoot>
        </table>
    ) : loadingIndicator
};

TotalsSummary.propTypes = {
    classes: shape({
        root: string,
        subtotalLabel: string,
        subtotalValue: string,
        totals: string
    }),
    currencyCode: string,
    numItems: number,
    subtotal: number
};

export default TotalsSummary;
