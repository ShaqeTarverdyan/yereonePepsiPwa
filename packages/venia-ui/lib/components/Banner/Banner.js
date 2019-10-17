import React, { useEffect } from 'react';
import BANNER_QUERY from '../../queries/getBanner.graphql';
import { useQuery } from '@magento/peregrine';
import classify from '../../classify';
import defaultClasses from './Banner.css';
import { resourceUrl } from '@magento/venia-drivers';

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
                <img
                    src={data.banner.image_path}
                    srcSet={`
                    ${resourceUrl(data.banner.image_path, {
                        type: 'image-banner',
                        width: 375,
                        height: 420
                    })} 375w,
                    ${resourceUrl(data.banner.image_path, {
                        type: 'image-banner',
                        width: 768,
                        height: 461
                    })} 768w,
                    ${resourceUrl(data.banner.image_path, {
                        type: 'image-banner',
                        width: 993,
                        height: 844
                    })} 993w,
                    ${resourceUrl(data.banner.image_path, {
                        type: 'image-banner',
                        width: 1024,
                        height: 875
                    })} 1024w,
                `}
                sizes="(min-width: 768px) 768px,100vw"
                alt='name'
                    className={`${classes[`banner${id}`]}`}
                />
            </div> : <div>Fetching Banner ... </div>
    );
}
export default classify(defaultClasses)(Banner);