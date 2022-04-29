// import './App.css';

import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
//import Temperaments from './components/Temperaments'
import NavBar from "./components/NavBar";
import DogDetails from "./components/DogDetails";

import SearchDogs from "./components/SearchsDogs";
//import { onFilter } from './utils';
import Registrar from "./components/Registart";
import {SearchDogTemperament} from "./components/SearchDogTemperament";

function App() {

  return (
    <>
    
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/home"}>
        <NavBar />

        <Home />
       
      </Route>
      <Route path={"/dogs"}>
        <NavBar />

        <SearchDogs />
      </Route>
      <Route
        path={"/dog/:id"}
        render={() => (
          <>
            <NavBar />
            <DogDetails />
          </>
        )}
      ></Route>
      <Route path={"/registrar"}>
        <NavBar />

        <Registrar />
      </Route>
      <Route path={"/temperaments"}>
        <NavBar />

        <SearchDogTemperament />
      </Route>
      
    </>
  );
}

export default App;
