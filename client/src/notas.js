import React from "react";
import {  useDispatch, useSelector } from 'react-redux';
import {getDogsPages} from '../actions'

const Pagination = ()=>{
const dispatch = useDispatch(); 
const state = useSelector(state=>state.dogs)
//const [dogsPages, setDogsPages] = useState();

let pagesNums = Math.ceil(state.length);
console.log(pagesNums)
let links = [];
let i =0
while(i<pagesNums){
    let data= state.slice(i,i+8) 
     links.push(data)
     i=i+8
}
const handleState=(data)=>{

   return dispatch(getDogsPages(data))
}
return (
    <div>
        
        <ul>
        {links.map((data,index)=><li key={index} onClick={() => handleState(data)}>{index+1}</li> )}
        
        </ul>
       
    </div>
)
};

const covertTobase64 = async(img)=>{
    console.log(img)
    let reader = new FileReader();
    reader.readAsDataURL(img);
   let data= reader.onload = function(){
      let base64 = reader.result;
       console.log(base64)
    };
//     await axios.post(`${URL_IMG}${data}`)
//    .then(data=> console.log(data))
//    .catch(err=>console.log(err))
    console.log(data())
  }
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


export default Pagination;