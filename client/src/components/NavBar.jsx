import React from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import style from "./Styles.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(getDogs());
 
  };

  return (
    <div className={`${style.navbar}`}>
      <ul>
        <Link to={"/home"}>
          <li onClick={() => handleClick()}>Home</li>
        </Link>
        <Link to={"/temperaments"}>
          <li>Search by Temperament</li>
        </Link>
        <Link to={"/registrar"}>
          <li>Register a Breeds</li>
        </Link>
        <li>
          <SearchBar />
        </li>
      </ul>
    </div>
  );
}
