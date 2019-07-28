import React, { useState } from 'react';
import Script from 'react-load-script';
import LocationSearch from '~/components/locationSearch';
const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;

export default () => {
  const [isGoogleLibraryScriptLoaded, setGoogleLibraryScriptLoaded] = useState(false);
  const handleScriptLoad = () => setGoogleLibraryScriptLoaded(true);

  return (
    <div>
      <Script
        url={scriptUrl}
        onLoad={handleScriptLoad}
      />
      {isGoogleLibraryScriptLoaded && <LocationSearch />}
    </div>
  )
}
