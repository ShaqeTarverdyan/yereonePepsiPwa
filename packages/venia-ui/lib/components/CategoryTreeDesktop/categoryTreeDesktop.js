import React, { useEffect } from 'react';
import { number, objectOf, shape, string } from 'prop-types';
import { useQuery } from '@magento/peregrine';
import { mergeClasses } from '../../classify';
import MENU_QUERY from '../../queries/getNavigationMenu.graphql';
import Branch from './categoryBranch';
import Leaf from './categoryLeaf';
import defaultClasses from './categoryTreeDesktop.css';


const TreeDesktop = props => {
    const {
        categoryId,
    } = props;


    const classes = mergeClasses(defaultClasses, props.classes);
    const [queryResult, queryApi] = useQuery(MENU_QUERY);
    const { data } = queryResult;
    const { runQuery } = queryApi;

    // fetch categories at first
    useEffect(() => {
        if (data === null) {
            runQuery({ variables: { id: categoryId } });
        }
    }, []);

    const categoryData = data != null ? data.category : 'Fetching ... ';
    const { children } = categoryData || {};

    // for each child category, render a direct link if it has no children
    // otherwise render a branch
    const branches = Array.from((categoryData && children) || [], category => {
        const isLeaf = category.children_count === '0';

        return isLeaf ? (
            <Leaf key={category.id} category={category} />
        ) : (
                <Branch
                    key={category.id}
                    category={category}
                />
            );
    });
    return (
            <ul className={classes.tree}>{branches}</ul>
    );
};

export default TreeDesktop;

TreeDesktop.propTypes = {
    categoryId: number,
    classes: shape({
        root: string,
        tree: string
    }),
};
