import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import { Title } from '../../components/Head';
import { mergeClasses } from '../../classify';
import FilterModal from '../../components/FilterModal';
import Gallery from '../../components/Gallery';
import Pagination from '../../components/Pagination';
import defaultClasses from './category.css';
import { useWindowSize } from '@magento/peregrine';

const CategoryContent = props => {
    const { data, openDrawer, pageControl, pageSize } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const filters = data ? data.products.filters : null;
    const items = data ? data.products.items : null;
    const title = data ? data.category.name : null;
    const titleContent = title ? `${title} - Venia` : 'Venia';
    
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 600;
    const isDesktop = windowSize.innerWidth >= 600;
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

    const modal = filters ? <FilterModal filters={filters} /> : null;
    const modalDesktop = isDesktop && filters ? <FilterModal filters={filters} classes={classes} isMobile={isMobile}/> : null;
    return (
        <Fragment>
            <Title>{titleContent}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{title}</div>
                </h1>
                {isMobile ? header : null}
                <div className={classes.content}>
                    <div>  {modalDesktop}</div>
                    <div>
                        <section className={classes.gallery}>
                            <Gallery data={items} pageSize={pageSize} />
                        </section>
                        <div className={classes.pagination}>
                            <Pagination pageControl={pageControl} />
                        </div>
                    </div>
                </div>
                {modal}
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
