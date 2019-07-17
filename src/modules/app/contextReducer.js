import * as Actions from '~/actions/actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case Actions.UPDATE_LOCATION_DATA:
      return {
        ...state,
        userLocation: payload,
        restaurantListData: {
          restaurantList: [],
          hasMoreData: true,
          startFromOffset: 0,
        }
      };
    case Actions.UPDATE_RESTAURANT_LIST:
      return {
        ...state,
        restaurantListData: {
          ...state.restaurantListData,
          ...payload,
        },
      };
    case Actions.UPDATE_RESTAURANT_LIST_HAS_MORE_DATA:
      return {
        ...state,
        restaurantListData: {
          ...state.restaurantListData,
          hasMoreData: payload,
        }
      }
    default: throw new Error('Unexpected action');
  }
};
