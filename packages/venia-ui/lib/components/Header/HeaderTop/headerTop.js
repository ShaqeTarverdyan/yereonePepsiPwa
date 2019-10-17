import React from 'react';
import defaultClasses from './HeaderTop.css';
import { mergeClasses } from '../../../classify';
import { Query } from '@magento/venia-drivers';
import getCmsBlock from '../../../queries/getCmsBlocks.graphql';
import { fullPageLoadingIndicator } from '../../LoadingIndicator';
import RichText from '../../RichText';


const HeaderTop = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Query query={getCmsBlock} variables={{ identifiers: 'header_top_text' }}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return (
                                <div className={classes.fetchError}>
                                    Data Fetch Error: <pre>{error.message}</pre>
                                </div>
                            );
                        }
                        if (loading) {
                            return fullPageLoadingIndicator;
                        }
                        const cmsBlock = data.cmsBlocks.items[0];
                        return (
                            <>
                                <p className={classes.phoneNumber}>
                                    Call: (888) 1900 86420
                                </p>
                                <div className={classes.block}>
                                    <RichText content={cmsBlock.content} />
                                </div>
                            </>
                        )
                    }}
                </Query>
            </div>
        </div>
    );
}

export default HeaderTop;