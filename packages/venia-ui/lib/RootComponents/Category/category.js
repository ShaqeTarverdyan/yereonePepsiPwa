import React, { useEffect, useState, useCallback } from 'react';
import { number, shape, string } from 'prop-types';
import { usePagination, useQuery } from '@magento/peregrine';

import { toggleDrawer } from '../../actions/app';
import catalogActions from '../../actions/catalog';
import { mergeClasses } from '../../classify';

import { fullPageLoadingIndicator } from '../../components/LoadingIndicator';
import { connect, withRouter } from '@magento/venia-drivers';
import { compose } from 'redux';
import categoryQuery from '../../queries/getCategory.graphql';
import isObjectEmpty from '../../util/isObjectEmpty';
import { getFilterParams } from '../../util/getFilterParamsFromUrl';
import CategoryContent from './categoryContent';
import defaultClasses from './category.css';

const Category = props => {
    const { filterClear, id, openDrawer, pageSize } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const [paginationValues, paginationApi] = usePagination({
        history: props.history,
        location: props.location
    });

    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const [queryResult, queryApi] = useQuery(categoryQuery);
    const { data, error, loading } = queryResult;
    const { runQuery, setLoading } = queryApi;
 

    const [ sortedValue, setSortedValue ] = useState({ name : 'ASC'});

    const handleSortedChange = useCallback((value) => {
        setSortedValue({[value]: 'ASC'})
    },[]);

    // clear any stale filters
    useEffect(() => {
        if (isObjectEmpty(getFilterParams())) {
            filterClear();
        }
    }, [filterClear]);

    // run the category query
    useEffect(() => {
        setLoading(true);
        runQuery({
            variables: {
                currentPage: Number(currentPage),
                id: Number(id),
                idString: String(id),
                onServer: false,
                pageSize: Number(pageSize),
                sortBy: sortedValue
            }
        });
        
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage, id, pageSize, runQuery, setLoading, sortedValue]);

    const totalPagesFromData = data
        ? data.products.page_info.total_pages
        : null;

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    // If we get an error after loading we should try to reset to page 1.
    // If we continue to have errors after that, render an error message.
    useEffect(() => {
        if (error && !loading && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPage, error, loading, setCurrentPage]);

    if (error && currentPage === 1 && !loading) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Data Fetch Error</div>;
    }

    // Show the loading indicator until data has been fetched.
    if (!totalPagesFromData) {
        return fullPageLoadingIndicator;
    }


    return data && typeof data != 'undefined' ? 
       ( <CategoryContent
            classes={classes}
            data={data}
            filterClear={filterClear}
            openDrawer={openDrawer}
            pageControl={pageControl}
            handleSortedChange = {handleSortedChange}
        />
    ): fullPageLoadingIndicator
};

Category.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    id: number,
    pageSize: number
};

Category.defaultProps = {
    id: 3,
    // TODO: This can be replaced by the value from `storeConfig when the PR,
    // https://github.com/magento/graphql-ce/pull/650, is released.
    pageSize: 6
};

const mapDispatchToProps = dispatch => ({
    filterClear: () => dispatch(catalogActions.filterOption.clear()),
    openDrawer: () => dispatch(toggleDrawer('filter'))
});

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(Category);
