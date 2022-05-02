import React,{useEffect, useState} from "react";
import Dogs from "./Dogs";
import { connect } from "react-redux";
import { orderByZa, orderByAz } from "../actions";


function SearchDogs(props) {
  const [loading,setLoading] = useState(false)
  useEffect(()=>{

    setLoading(true)
  },[props.dogName]);
  useEffect(()=>{

    return setLoading(false)
   },[]);

   if (!loading) {
    return <div>cargando</div>;
  }
  return (
    <div >
      <Dogs array={props.dogName} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    dogName: state.dogsByName,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderByZa: (name) => dispatch(orderByZa(name)),
    orderByAz: (name) => dispatch(orderByAz(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDogs);
//export default Home;
