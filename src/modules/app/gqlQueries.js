import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation($userIdentifier: String!, $password: String!) {
    signIn(userIdentifier: $userIdentifier, password: $password) {
      token
      user {
        username
        email
        id
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation($userIdentifier: String!, $username: String!, $password: String!) {
    signUp(email: $userIdentifier, username: $username, password: $password) {
      id
    }
  }
`;

export const LOCAL_USER_DATA = gql`
  query {
    token @client
    user @client {
      email
      id
      username
    }
  }
`;

export const GET_DIRECTION = gql`
  fragment TransitPointDetailsParts on TransitPointDetails {
    formatedTime
    address
    timeZone
    timeValue
    location {
      latitude
      longitude
    }
  }
  fragment OtherPointDetailsParts on OtherPointDetails {
    address
    location {
      latitude
      longitude
    }
  }
  fragment TripDataPart on TripData {
    arrival {
      ... on TransitPointDetails {
        ...TransitPointDetailsParts
      }
      ... on OtherPointDetails {
        ...OtherPointDetailsParts
      }
    }
    departure {
      ... on TransitPointDetails {
        ...TransitPointDetailsParts
      }
      ... on OtherPointDetails {
        ...OtherPointDetailsParts
      }
    }
    tripDuration {
      ...TypedDataParts
    }
    tripDistance {
      ...TypedDataParts
    }
  }
  fragment TypedDataParts on TypedData {
    formattedValue
    rawValue
  }
  fragment CoordsPart on Coords {
    latitude
    longitude
  }
  query($coordinates: PlaceCoordinatesInput!, $travelMode: AllowTravelModes!) {
    direction(coordinates: $coordinates, travelMode: $travelMode) {
      fare {
        formattedFare
        currency
        fareValue
      }
      tripData {
        ...TripDataPart
      }
      steps {
        stepTravelMode
        stepDistance {
          ...TypedDataParts
        }
        stepDuration {
          ...TypedDataParts
        }
        startLocation {
          ...CoordsPart
        }
        endLocation {
          ...CoordsPart
        }
        polyline
        stepInstruction
        ... on WalkStep {
          walkSteps {
            stepTravelMode
            stepInstruction
          }
        }
        ... on TransitStep {
          arrival {
            ...TransitPointDetailsParts
          }
          departure {
            ...TransitPointDetailsParts
          }
          transitData {
            tripName
            tripShortName
            url
            headSign
            stopsCount
            vehicleIcon
            vehicleName
            vehicleType
          }
        }
      }
    }
  }
`;
