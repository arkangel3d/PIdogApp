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
export default Pagination;