import React, { useState } from 'react';
import Script from 'react-load-script';
import LocationSearch from '~/components/locationSearch';
import styles from './styles.scss';

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;

export default () => {
  const [isGoogleLibraryScriptLoaded, setGoogleLibraryScriptLoaded] = useState(false);
  const handleScriptLoad = () => setGoogleLibraryScriptLoaded(true);

  if (!isGoogleLibraryScriptLoaded) {
    return (
      <div>
        <Script
          url={scriptUrl}
          onLoad={handleScriptLoad}
        />
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div className={styles['search-input-wrapper']}>
        <LocationSearch
          placeholder='Enter start location...'
          onSelect={(selectedLocation) => console.log({selectedLocation})}/>
        <LocationSearch
          placeholder='Enter end location...'
          onSelect={(selectedLocation) => console.log({selectedLocation})}/>
      </div>
    </div>
  )
}
