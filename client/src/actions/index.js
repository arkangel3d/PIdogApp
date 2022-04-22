const axios = require("axios");
// const { HOST_DEV } = process.env;
const GET_DOGS = "GET_DOGS";
const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
const ORDER_BY_ZA = "ORDER_BY_ZA";
const GET_DOG_BY_ID = "GET_DOG_BY_ID";
const SEARCH_NAME = "SEARCH_NAME";
// const CREATE_DOG = 'CREATE_DOG';
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

export function orderByZa(data) {
  // return function(dispatch) {
  //   return axios.get(`http://localhost:3001/dogs?name=${name}`)
  //     .then(({ data }) => {
  //   let dataSorted = data?.sort((x,y)=>y.name.localeCompare(x.name))
  //     dispatch({type:GET_DOGS, payload:dataSorted });
  //   });
  // };
  return function (dispatch) {
    //let dataSorted = data.sort((x,y)=>y.name.localeCompare(x.name));
    //console.log('hola',dataSorted)
    let dataSorted = data?.sort((x, y) => y.name.localeCompare(x.name));
    dispatch({ type: ORDER_BY_ZA, payload: dataSorted });
  };
}
export function orderByAz(name = "") {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs?name=${name}`)
      .then(({ data }) => {
        let dataSorted = data?.sort((x, y) => x.name.localeCompare(y.name));
        dispatch({ type: GET_DOGS, payload: dataSorted });
      });
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

export { GET_DOGS, GET_DOGS_BY_NAME, ORDER_BY_ZA, GET_DOG_BY_ID, SEARCH_NAME };
