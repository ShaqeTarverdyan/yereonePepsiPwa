import React, { useEffect } from 'react';
import BANNER_QUERY from '../../queries/getBanner.graphql';
import { useQuery } from '@magento/peregrine';
import classify from '../../classify';
import defaultClasses from './Banner.css';

const Banner = props => {
    const { id, classes } = props
    const [queryResult, queryApi] = useQuery(BANNER_QUERY);
    const { data } = queryResult;
    const { runQuery } = queryApi;

    useEffect(() => {
        if (data === null) {
            runQuery({ variables: { id: id } });
        }
    }, []);

    return (
        (data != null && data.banner) ?
            <div className={classes[data.banner.hover_effect]}>
                <div>
                    <img
                        src={data.banner.image}
                        alt='name'
                        className={`${classes[`banner${id}`]}`}
                    />
                </div>
            </div> : <div>Fetching Banner ... </div>
    );
}
export default classify(defaultClasses)(Banner);