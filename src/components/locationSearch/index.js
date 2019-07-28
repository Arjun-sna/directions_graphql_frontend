import React, { useState } from 'react';
import PlacesAutoComplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import Dropdown from '~/components/dropdown';
import styles from './styles.scss';

const renderSearchResultItem = ({ id, description, formattedSuggestion }) => {
  return (
    <div>
      {description}
    </div>
  )
}

export default ({
  onSelect,
  placeholder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  const inputProps = {
    placeholder: placeholder || 'Search here...',
    onFocus: () => setInputFocused(true),
    onBlur: () => setInputFocused(false)
  }
  const onSelectResultItem = (selectedItem) => {
    setSearchQuery(selectedItem.description);
    onSelect && onSelect(selectedItem);
  }
  
  return (
    <PlacesAutoComplete
      value={searchQuery}
      onChange={setSearchQuery}
      debounce={1000}
    >
      {
        ({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
          return (
            <Dropdown
              inputProps={{...getInputProps(inputProps)}}
              options={suggestions}
              onChange={onSelectResultItem}
              renderOption={renderSearchResultItem}
              keyExtractor={({ description }) => description}
              className={`${styles['search-root']} ${isInputFocused ? styles['search-root-focused'] : ''}`}
              controlClassName={styles['search-dropdown-control']}
              inputClassName={styles['search-input']}
              
            />
          )
        }
      }
    </PlacesAutoComplete>
  )
}