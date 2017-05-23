import * as types from './actionTypes';

const initialState = {
    formSubmitted: false,
    hasLoaded: false,
    id: null,
    commodityList: null,
    name: null,
    description: null,
    price: null,
    metadata: null
};

export default function commodities(state = initialState, action = {}) {
    switch (action.type) {

        case types.LOAD_COMMODITIES:
          return Object.assign({}, state, {
            hasLoaded: false,
            formSubmitted: false
          });

        case types.COMMODITIES_DETAILS_LOADED:
          return Object.assign({}, state, {
            hasLoaded: true,
            commodityList: action.payload.commodities
          });

        case types.COMMODITY_DETAILS_LOADED:
          return Object.assign({}, state, {
            hasLoaded: true,
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            price: action.payload.price,
            metadata: action.payload.commodity_metadata,
          });

        case types.UPDATE_COMMODITY_DETAILS:
          let newMetaData;

          if (action.payload.metadata) {
            newMetaData = state.metadata;
            for (var i=0; i<action.payload.metadata.length; i++) {
              const field = action.payload.metadata[i];
              newMetaData[field.position] = {[field.key]: field.value};
            }
          }

          return Object.assign({}, state, {
            name: action.payload.name ? action.payload.name : state.name,
            description: action.payload.description ? action.payload.description : state.description,
            price: action.payload.price ? action.payload.price : state.price,
            metadata: newMetaData ? newMetaData : state.metadata
          });

        case types.NEW_METADATA:
          const metadataCopy = state.metadata;
          // signify new metadata
          metadataCopy.push({});
          // push empty object to signify new metadata
          return Object.assign({}, state, {
            metadata: metadataCopy
          });

        case types.SUBMIT_FORM:
          return Object.assign({}, state, {
            formSubmitted: false
          });

        case types.SUBMIT_FORM_SUCCESS:
          // reset to initial state
          return Object.assign({}, initialState, {
            formSubmitted: true
          });

        default:
          return state;
    }
}
