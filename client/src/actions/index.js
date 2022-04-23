const axios = require("axios");
// const { HOST_DEV } = process.env;
const GET_DOGS = "GET_DOGS";
const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
const ORDER_BY_ZA = "ORDER_BY_ZA";
const GET_DOG_BY_ID = "GET_DOG_BY_ID";
const SEARCH_NAME = "SEARCH_NAME";
const PAGES = "PAGES";

export function dispatchDogs(data) {
  return { type: GET_DOGS, payload: data };
}

export function getDogs() {
  return function (dispatch) {
   
    return axios.get(`http://localhost:3001/dogs`).then(({ data }) => {
      dispatch(dispatchDogs(data));
    });
  };
}
export function getDogsByName(name) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs?name=${name}`)
      .then(({ data }) => {
        dispatch({ type: GET_DOGS_BY_NAME, payload: data });
      });
  };
}
export function setOrderZa(data) {
 
  return { type: ORDER_BY_ZA, payload: data };
}
export function orderByZa(name='') {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/dogs?name=${name}`)
      .then(({ data }) => {
       let dataSorted = data.reverse()
      dispatch(setOrderZa( dataSorted ));
    });
  };
}
export function orderByAz(array) {
 
  return function (dispatch) {
    
    return dispatch(getDogs());
  };
}
export function searchName(name) {
  return function (dispatch) {
    return dispatch({ type: SEARCH_NAME, payload: name });
  };
}
export function dispatchDog(data) {
 
  return { type: GET_DOG_BY_ID, payload: data };
}
export function getDogById(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
      dispatch(dispatchDog(data));
    });
  };
}
export function setPages(data) {
 
  return { type: PAGES, payload: data };
}

export { GET_DOGS, GET_DOGS_BY_NAME, ORDER_BY_ZA, GET_DOG_BY_ID, SEARCH_NAME,PAGES };
