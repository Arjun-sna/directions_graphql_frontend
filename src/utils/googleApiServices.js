import axios from 'axios';

const GOOGLE_API_BASE_URL = 'https://maps.googleapis.com/maps/api';
const { GOOGLE_API_KEY } = process.env;

export const getPlacePredictionsForSearchQuery = async (searchQuery) => {
  const queryParams = {
    key: GOOGLE_API_KEY,
    input: searchQuery,
  };
  const placesResponse = await axios.get(
    `${GOOGLE_API_BASE_URL}/place/autocomplete/json?`,
    { params: queryParams },
  );

  if (placesResponse.status === 200) {
    return placesResponse.data && placesResponse.data.predictions;
  }
};

export const geoCodeLocation = async (locationDescription) => {
  const queryParams = {
    key: GOOGLE_API_KEY,
    address: locationDescription,
  };
  const geoCodeResponse = await axios.get(
    `${GOOGLE_API_BASE_URL}/geocode/json`,
    { params: queryParams },
  );

  if (geoCodeResponse.status === 200) {
    const { data: { results } } = geoCodeResponse;
    const { location: { lat, lng } } = results[0].geometry;

    return {
      latitude: lat,
      longitude: lng,
      place_id: results[0].place_id,
    };
  }

  return null;
};
