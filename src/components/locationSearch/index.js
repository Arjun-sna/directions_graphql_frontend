import React, { useState } from 'react';
import PlacesAutoComplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import Dropdown from '~/components/dropdown';

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
              inputProps={{...getInputProps({placeholder: placeholder || 'Search here...'})}}
              options={suggestions}
              onChange={onSelectResultItem}
              renderOption={renderSearchResultItem}
              keyExtractor={({ description }) => description}
            />
          )
        }
      }
    </PlacesAutoComplete>
  )
}