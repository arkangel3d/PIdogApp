import React from "react";
import { useDispatch } from "react-redux";
import style from "./Styles.module.css";
import { Link } from "react-router-dom";
import { getDogById } from "../actions";

const Dog = ({ id, name, weight, temperament, image }) => {
  const dispatch = useDispatch();
  
  return (
    <div key={`id${id}`} className={`${style.card}`}>
      <Link to={`/dog/${id}`} onClick={() => dispatch(getDogById(id))}>
        <img className={style.avatar} src={`${image}` } alt="sin imagen"  />
        </Link>
        <div className={`${style.container}`}>
          <h4>
            <b>{name}</b>
          </h4>
          <p>weight: {weight}</p>
          <p>Temperaments: {temperament}</p>
        </div>
      
    </div>
  );
};
export default Dog;
