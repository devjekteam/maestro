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

export function submitCommodityForm(basicInfo) {
  return (dispatch, getState) => {
    const { jwt }  = getState().appState;

    dispatch(startSubmitting());

    // get the redux state for the commodity
    const fields = getState().commodities;

    const payload = {
      "name": fields.name,
      "description": fields.description,
      "price": fields.price,
      "commodity_metadata": fields.metadata
    }

    fetch(`${API_ENDPOINT}/commodities/${fields.id}` , {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
      if (response.error) throw Error(response.error);
      dispatch(doneSubmitting());
    })
    .catch( error => {
      console.log(error);
      const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
      'Please try again!' : error.message;
      dispatch(sendErrorNotification(errMsg));
    });
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

function startSubmitting() {
  return {
    type: types.SUBMIT_FORM
  }
}

function doneSubmitting() {
  return {
    type: types.SUBMIT_FORM_SUCCESS
  }
}
