import React from "react";
import style from './Styles.module.css';
const RenderDogDetails =({dog})=>{
return (
    <div key={dog.id}>
     
    
    <div className={`${style.dogCard} ${style.fatherElement}`}>
     
     
    <h3>{dog.name}</h3>

   <div >
    <div  >
      <p>{dog.weight.metric}</p>

    </div>
    <div >
      <p>{dog.temperament}</p>
      
    </div>
    <div >
         <img className={`${style.elementImg}`} src={`${dog.image.url}`} alt="sin imagen"/> 
  
    </div>
    <div >
    <p>{dog.height.metric}</p>
  
    </div>
    <div >
    <p>{dog.life_span}</p>
  
    </div>
  
  </div>
   
   

</div>
</div>
)
};

export default RenderDogDetails;