import React, { Component } from 'react';
import FilterFooter from './FilterFooter';
import PropTypes from 'prop-types';
import { List } from '@magento/peregrine';
import { FiltersCurrent } from './FiltersCurrent';
import classify from '../../classify';
import { X as CloseIcon } from 'react-feather';
import Icon from '../Icon';
import FilterBlock from './filterBlock';
import defaultClasses from './filterModal.css';
import { Modal } from '../Modal';

class FilterModal extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            modalWrapper: PropTypes.string,
            header: PropTypes.string,
            headerTitle: PropTypes.string,
            filterOptionsContainer: PropTypes.string
        }),
        filters: PropTypes.arrayOf(
            PropTypes.shape({
                request_var: PropTypes.string,
                items: PropTypes.array
            })
        ),
        addFilter: PropTypes.func,
        removeFilter: PropTypes.func,
        closeDrawer: PropTypes.func
    };

    componentDidUpdate() {
        const { drawer } = this.props;

        if (drawer !== 'filter') {
            this.props.setToApplied();
        }
    }

    render() {
        const { classes, drawer, closeDrawer, isMobile } = this.props;
        const modalClassMobile = drawer === 'filter' ? classes.rootFilterModalOpen : classes.rootFilterModal;
        const modalClass = isMobile ? modalClassMobile : classes.rootFilterDesktop;
        const filterContent = 
        <aside className={modalClass}>
            <div className={classes.modalWrapper}>
                <div className={classes.header}>
                    <span className={classes.headerTitle}>
                        FILTER BY
                    </span>
                    <button onClick={closeDrawer}>
                        <Icon src={CloseIcon} />
                    </button>
                </div>

                <FiltersCurrent keyPrefix="modal" />

                <List
                    items={this.props.filters}
                    getItemKey={({ request_var }) => request_var}
                    render={props => (
                        <ul className={classes.filterOptionsContainer}>
                            {props.children}
                        </ul>
                    )}
                    renderItem={props => (
                        <FilterBlock
                            item={props.item}
                            addFilter={this.props.addFilter}
                            removeFilter={this.props.removeFilter}
                        />
                    )}
                />
            </div>
            <FilterFooter />
        </aside>;
        
        return ( isMobile ? <Modal>{filterContent}</Modal> : filterContent );
    }
}

export default classify(defaultClasses)(FilterModal);
