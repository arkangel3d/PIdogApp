import  React from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import style from "./Styles.module.css";
import SearchBar from './SearchBar'

export default function NavBar() {
  const dispatch = useDispatch();
 
  
  function handleClick() {
    dispatch(getDogs());
    //history.push("/home");
  }


  return (
    <div className={`${style.navbar}`} >
      <Link to={'/home'}>
      <p onClick={() => handleClick()}>Home</p>
      </Link>
     
      
      <Link to={"/temperaments"}>
        <p>Temperaments</p>
      </Link>

      <Link to={"/registrar"}>
        <p>Registrar Raza</p>
      </Link>

      <SearchBar/>
    </div>
  );
};
