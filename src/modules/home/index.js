import React, { useState } from "react";
import Script from "react-load-script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationSearch from "~/components/locationSearch";
import styles from "./styles.scss";
import ResultView from "./components/resultView";

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;

export default () => {
  const [isGoogleLibraryScriptLoaded, setGoogleLibraryScriptLoaded] = useState(
    false
  );
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndpoint] = useState(null);
  const getQueryVariables = () => ({
    coordinates: {
      startLat: startPoint.latitude,
      startLng: startPoint.longitude,
      endLat: endPoint.latitude,
      endLng: endPoint.longitude
    },
    travelMode: "transit"
  });
  const handleScriptLoad = () => setGoogleLibraryScriptLoaded(true);

  if (!isGoogleLibraryScriptLoaded) {
    return (
      <div>
        <Script url={scriptUrl} onLoad={handleScriptLoad} />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className={styles["search-input-root"]}>
        <div className={styles["search-input-wrapper"]}>
          <LocationSearch
            className={styles["search-input"]}
            placeholder="Enter start location..."
            onSelect={setStartPoint}
          />
          <LocationSearch
            className={styles["search-input"]}
            placeholder="Enter end location..."
            onSelect={setEndpoint}
          />
        </div>
        <div className={styles["swap"]}>
          <FontAwesomeIcon icon="exchange-alt" color="#00000099" size="lg" />
        </div>
      </div>
      {startPoint && endPoint && (
        <ResultView queryVariables={getQueryVariables()} />
      )}
    </div>
  );
};
