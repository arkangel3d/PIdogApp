import React from "react";
import { useDispatch } from "react-redux";
import style from './Styles.module.css';
import { Link } from "react-router-dom";
import { getDogById } from '../actions'
// { id, name, height, weight, life_span, temperament, image }
const Dog = ({ id, name, height, weight, life_span, temperament, image }) => {
  const dispatch = useDispatch()
  return (
    
    
    <div key={`id${id}`}>

    
    <div className={`${style.dogCard} ${style.fatherElement}`}>
     
    <Link  to={`/dog/${id}`} onClick={()=> dispatch(getDogById(id))}>
    <h3>{name}</h3>
    </Link>
   <div >
    <div  >
      <p>{weight}</p>

    </div>
    <div >
      <p>{temperament}</p>
      
    </div>
    <div >
         <img className={`${style.elementImg}`} src={`${image}`} alt="sin imagen"/> 
  
    </div>
    
    
  
  </div>
   
   

</div>
</div>

  );
};
export default Dog;

