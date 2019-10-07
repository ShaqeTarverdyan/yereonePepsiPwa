import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import { Title } from '../../components/Head';
import { mergeClasses } from '../../classify';
import FilterModal from '../../components/FilterModal';
import Toolbar from './toolbar';
import Gallery from '../../components/Gallery';

import defaultClasses from './category.css';
import { useWindowSize } from '@magento/peregrine';

const CategoryContent = props => {
    const { data, openDrawer, pageControl, pageSize, handleSortedChange } = props;
    const { products } = data;
    const { filters, items } = products;

    const classes = mergeClasses(defaultClasses, props.classes);
    const title = data ? data.category.name : null;
    const titleContent = title ? `${title} - Venia` : 'Venia';

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 600;
    const header = filters ? (
        <div className={classes.headerButtons}>
            <button
                className={classes.filterButton}
                onClick={openDrawer}
                type="button"
            >
                {'Filter'}
            </button>
        </div>
    ) : null;
    const modal = filters ? <FilterModal filters={filters} isMobile={isMobile} /> : null;

    return (
        <Fragment>
            <Title>{titleContent}</Title>
            <article className={classes.root}>
                <hr />
                {isMobile ? header : null}
                <div className={classes.content}>
                    {modal}
                    <div>
                        <Toolbar 
                            data={data} 
                            handleSortedChange={handleSortedChange}
                            pageControl={pageControl}
                        />
                        <section className={classes.gallery}>
                            <Gallery data={items} pageSize={pageSize} />
                        </section>
                    </div>
                </div>
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        pagination: string,
        root: string,
        title: string
    })
};
