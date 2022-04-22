import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  ORDER_BY_ZA,
  GET_DOG_BY_ID,
  SEARCH_NAME,
} from "../actions/index.js";

const initialState = {
  dogs: [],
  temperaments: [],
  dogsByName: [],
  dogById: [],
  searchName: "",
};

export default function rootReducer(state = initialState, action) {
  //funciona
  if (action.type === GET_DOGS) {
    return {
      ...state,
      dogs: action.payload,
    };
  }
  //funciona
  if (action.type === GET_DOGS_BY_NAME) {
    return {
      ...state,
      dogsByName: action.payload,
    };
  }
  if (action.type === ORDER_BY_ZA) {
    return {
      ...state,
      dogs: action.payload,
    };
  }
  if (action.type === GET_DOG_BY_ID) {
    return {
      ...state,
      dogById: action.payload,
    };
  }
  if (action.type === SEARCH_NAME) {
    return {
      ...state,
      searchName: action.payload,
    };
  }

  return state;
}
