import React, { useCallback } from 'react';
import { func, shape, string } from 'prop-types';
import { useFieldState, useFormApi } from 'informed';
import { Search as SearchIcon, X as ClearIcon } from 'react-feather';
import { useSearchParam } from '@magento/peregrine';

import Icon from '../Icon';
import TextInput from '../TextInput';
import Trigger from '../Trigger';
import search from './search.png'
import Image from '../Image';
import defaultClasses from './searchField.css';
const clearIcon = <Icon src={ClearIcon} size={18} />;
const searchIcon = <Icon src={SearchIcon} size={18} />;

const SearchField = props => {
    const { location, onChange, onFocus } = props;
    const { value } = useFieldState('search_query');
    const formApi = useFormApi();

    const setValue = useCallback(
        queryValue => {
            // update search field
            if (queryValue) {
                formApi.setValue('search_query', queryValue);
            }

            // trigger the effects of clearing the field
            if (typeof onChange === 'function') {
                onChange('');
            }
        },
        [formApi, onChange]
    );

    useSearchParam({ location, parameter: 'query', setValue });

    const resetForm = useCallback(() => {
        formApi.reset();
    }, [formApi]);

    const resetButton = value ? (
        <Trigger action={resetForm}>{clearIcon}</Trigger>
    ) : null;
    
    return (
        <TextInput
            after={resetButton}
            before={<Image src={search} style={{width:'25px', height:'25px'}} />}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            placeholder='Search here ...'
            classes={defaultClasses}
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    location: shape({
        search: string
    }).isRequired,
    onChange: func,
    onFocus: func
};
