import React, { useState } from 'react';
import Script from 'react-load-script';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationSearch from '~/components/locationSearch';
import styles from './styles.scss';
import { GET_DIRECTION } from '../app/gqlQueries';
import Loader from '~/components/loader';

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;

export default () => {
  const [isGoogleLibraryScriptLoaded, setGoogleLibraryScriptLoaded] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndpoint] = useState(null);
  const getQueryVariables = () => ({
    coordinates: {
      startLat: startPoint.latitude,
      startLng: startPoint.longitude,
      endLat: endPoint.latitude,
      endLng: endPoint.longitude
    },
    travelMode: "driving"
  })
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
          onSelect={setStartPoint}/>
        <div className={styles['swap']}>
          <FontAwesomeIcon icon='exchange-alt' color='#00000099' size='lg' />
        </div>
        <LocationSearch
          placeholder='Enter end location...'
          onSelect={setEndpoint}/>
      </div>
      {
        (startPoint && endPoint) && (
          <Query
            query={GET_DIRECTION}
            variables={getQueryVariables()}
            >
            {
              ({ loading, error, data }) => {
                if (loading) {
                  return <Loader />
                }
                console.log({data})
              }
            }
          </Query>
        )
      }
    </div>
  )
}
