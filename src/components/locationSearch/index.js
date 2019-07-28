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

export default ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
console.log({searchQuery})
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
              inputProps={{...getInputProps({placeholder: 'Enter start location...'})}}
              options={suggestions}
              onChange={onSelect}
              renderOption={renderSearchResultItem}
            />
          )
        }
      }
    </PlacesAutoComplete>
  )
}