// import './App.css';

import { Route, } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
//import Temperaments from './components/Temperaments'
import NavBar from './components/NavBar';
import DogDetails from './components/DogDetails';
import SearchBar from './components/SearchBar.jsx'
import SearchDogs from './components/SearchsDogs'
//import { onFilter } from './utils';

function App() {
 
  return (
    <>
    <Route exact path={'/'}>
      <Landing/>
    </Route>
    <Route path={'/home'}>
    <NavBar/>
    <SearchBar/>
      <Home/>
    </Route>
    <Route path={'/dogs'}>
     <NavBar/>
     <SearchBar/>
     <SearchDogs/>
    </Route>
    <Route path={'/dog/:id'}  render={()=><><NavBar/><SearchBar/><DogDetails/></>}>
    
    </Route>
    </>
    
  );
}

export default App;
