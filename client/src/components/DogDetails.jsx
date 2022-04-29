import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import RenderDogDetails from "./RenderDogDetails";

const DogDetails = () => {
  const dog = useSelector((state) => state.dogById);
  const [loading,setLoading] = useState(false)
 
  useEffect(()=>{

     setLoading(true)
   },[dog]);
  useEffect(()=>{

   return setLoading(false)
  },[]);

  
  if (!loading) {
    return <div>cargando</div>;
  }
  // const handleClick=()=>{
  //   history.goBack()
  // }
  return (
    <div>
      {/* <div><button onClick={()=>handleClick()}>Atras</button></div> */}
      <RenderDogDetails dog={dog} />
    </div>
  );
};

export default DogDetails;
