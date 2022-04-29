import React from "react";
import Dog from "./Dog";
import style from "./Styles.module.css";


//import { render } from '@testing-library/react';

const Dogs = ({array}) => {


if(array.length<1){
  return(
    <div>cargando</div>
  )
}
  const renderDogs = Array.isArray(array) && array.map((dog) => {
      let obj = {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.imperial,
        image: dog.image.url,
        temperament: dog.temperament,
      };
      
      return Dog(obj)
    });
 

  return <div className= {style.renderDiv}>{renderDogs ? renderDogs : <h2>{array}</h2>}</div>;
};

export default Dogs;
