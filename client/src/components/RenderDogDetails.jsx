import React from "react";
import style from './Styles.module.css';
const RenderDogDetails =({dog})=>{
  // { id, name, height, weight, life_span, temperament, image }

return (
  <div key={`id${dog.id}`} className={`${style.card} ${style.renderDiv}`}>
  
    <img className={style.avatar} src={`${dog.image.url}` } alt="sin imagen"  />

    <div className={`${style.container}`}>
      <h4>
        <b>{dog.name}</b>
      </h4>
      <p >Weight: {dog.weight.imperial}</p>
      <p title={dog.height.metric}>Height: {dog.height.imperial}</p>
      <p>Life Span: {dog.life_span}</p>
      <p>Temperaments: {dog.temperament}</p>
    </div>
  
</div>
)
};

export default RenderDogDetails;