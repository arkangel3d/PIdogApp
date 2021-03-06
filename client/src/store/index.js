import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
    rootReducer,composeWithDevTools(applyMiddleware(thunk))
    
  );
  export default store;
  
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()