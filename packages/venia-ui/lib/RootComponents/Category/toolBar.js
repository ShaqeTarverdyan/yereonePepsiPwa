import React from 'react';
import defaultClasses from './category.css';
import { mergeClasses } from '../../classify';
import Pagination from '../../components/Pagination';



const Toolbar = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { data, pageControl, handleSortedChange } = props;
    const { products } = data;
    const { items, total_count, page_info, sort_fields } = products;
    const { current_page, total_pages } = page_info;
    const length = items.length;
    const total = current_page - 1;
    const handleSelectChange = (e) => {
        return handleSortedChange(e.target.value)
    }
    return (
        <div>
            <div className={classes.actions}>
                <div className={classes.sort}>
                    <section >
                        <span>Sort By</span>
                        <select onChange={handleSelectChange} >
                            {
                                sort_fields && typeof (sort_fields.options) != 'undefined' ? sort_fields.options.map(option =>
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ) : <p>loading</p>
                            }
                        </select>

                    </section>
                    <section className={classes.itemsCount}>
                        <span>
                            Items
                                {
                                current_page === 1 ? (`${current_page} - ${current_page * length}`) :
                                    (current_page < total_pages ?
                                        (`${total * length + 1} - ${current_page * length}`) :
                                        (`${total_count - length + 1} - ${total_count}`)
                                    )
                            }
                        </span>
                        <span> of {total_count}</span>
                    </section>
                </div>
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </div>
            </div>
        </div>
    );
}

export default Toolbar;