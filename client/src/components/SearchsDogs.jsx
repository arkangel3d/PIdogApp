import React from "react";
import Dogs from "./Dogs";
import { connect } from "react-redux";
import { orderByZa,orderByAz } from "../actions";
import style from "./Styles.module.css";
//import { useSelector } from "react-redux";


//import {setPagination} from '../utils.js'



function SearchDogs(props) {

  //const [dogsArray, setDogsArray] = useState([]);
  
 // const dispatch = useDispatch();
  //const state = useSelector((state) => state.dogs);

  

  return (
    <div className={style.searchDog}>
      
     
      <Dogs array={(props.dogName)}/>
     
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
    orderByAz: (name) => dispatch(orderByAz(name))
    
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchDogs);
//export default Home;