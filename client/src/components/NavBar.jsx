import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import { useHistory } from "react-router-dom";
import style from "./Styles.module.css";
export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [classStick,setclassStick] = useState('');
  function handleClick() {
    dispatch(getDogs());
    history.push("/home");
  }
  function handleScroll() {
    console.log(classStick)
    setclassStick('sticky')
  }
  return (
    <div className={`${style.navbar} ${classStick}`} onScroll={()=>handleScroll()}>
      <Link to={"/registrar"}>
        <p>Registrar Raza</p>
      </Link>
      <p onClick={() => handleClick()}>Home</p>
    </div>
  );
}
