import * as types from './actionTypes';

import { startLoading, doneLoading, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function loadCommodities() {
    return (dispatch, getState) => {
        const { jwt, loggedInUser }  = getState().appState;

        dispatch(startLoading());
        dispatch(loadingCommodities());

        fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}/commodities` , {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(response => {
            return response.json();
        }).then(commodities => {
            if (commodities.error) throw Error(commodities.error);
            dispatch(commoditiesLoaded(commodities));
            dispatch(doneLoading());
        }).catch(error => {
            console.log(error);
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
            'Please try again!' : error.message;
            dispatch(doneLoading());
            dispatch(commoditiesLoaded());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

export function loadCommodity(commodityId) {
  return (dispatch, getState) => {
      const { jwt }  = getState().appState;

      dispatch(startLoading());
      dispatch(loadingCommodities());

      fetch(`${API_ENDPOINT}/commodities/${commodityId}` , {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': jwt
          }
      })
      .then(response => {
          return response.json();
      }).then(commodities => {
          if (commodities.error) throw Error(commodities.error);
          dispatch(commodityLoaded(commodities));
          dispatch(doneLoading());
      }).catch(error => {
          console.log(error);
          const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
          'Please try again!' : error.message;
          dispatch(doneLoading());
          dispatch(sendErrorNotification(errMsg));
      });
  };
}

export function updateCommodityDetails(changes) {
    return {
      type: types.UPDATE_COMMODITY_DETAILS,
      payload: changes
    }
}

export function newMetaData() {
  return {
    type: types.NEW_METADATA
  }
}

function commoditiesLoaded(commodities) {
    return {
        type: types.COMMODITIES_DETAILS_LOADED,
        payload: commodities
    }
}

function commodityLoaded(commodity) {
    return {
        type: types.COMMODITY_DETAILS_LOADED,
        payload: commodity
    }
}

function loadingCommodities() {
    return {
        type: types.LOAD_COMMODITIES
    }
}
