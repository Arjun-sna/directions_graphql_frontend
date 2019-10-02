import React, { useState } from "react";
import PlacesAutoComplete, {
  getLatLng,
  geocodeByAddress
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "~/components/dropdown";
import styles from "./styles.scss";

const renderSearchResultItem = ({ id, description, formattedSuggestion }) => {
  return <div>{description}</div>;
};

export default ({ onSelect, placeholder, className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const inputProps = {
    placeholder: placeholder || "Search here...",
    onFocus: () => setInputFocused(true),
    onBlur: () => setInputFocused(false)
  };
  const onSelectResultItem = async selectedItem => {
    setSearchQuery(selectedItem.description);
    const geoCodeData = await geocodeByAddress(selectedItem.description);
    const { lat: latitude, lng: longitude } = await getLatLng(geoCodeData[0]);
    const selectedLocation = { ...selectedItem, latitude, longitude };
    onSelect && onSelect(selectedLocation);
  };

  return (
    <PlacesAutoComplete
      value={searchQuery}
      onChange={setSearchQuery}
      debounce={1000}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Dropdown
            inputProps={{ ...getInputProps(inputProps) }}
            options={suggestions}
            onChange={onSelectResultItem}
            renderOption={renderSearchResultItem}
            keyExtractor={({ description }) => description}
            className={`${styles["search-root"]} ${className || ""}`}
            controlClassName={`${styles["search-dropdown-control"]} ${
              isInputFocused ? styles["search-dropdown-control-focused"] : ""
            }`}
            inputClassName={styles["search-input"]}
            leftIcon={() => (
              <FontAwesomeIcon
                icon="map-marker-alt"
                color="#00000099"
                size="sm"
              />
            )}
          />
        );
      }}
    </PlacesAutoComplete>
  );
};
