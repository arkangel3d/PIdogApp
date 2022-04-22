import React from "react";
import Dogs from "./Dogs";
import { connect } from "react-redux";
import { orderByZa,orderByAz } from "../actions";
//import { useSelector } from "react-redux";
//import Pagination from './Pagination'

//import {setPagination} from '../utils.js'


function Home(props) {

  //const [dogsArray, setDogsArray] = useState([]);
  
 // const dispatch = useDispatch();
  //const state = useSelector((state) => state.dogs);

  

  return (
    <div>
      
      <div>
        <p>Ordenar</p>
        <button onClick={()=>props.orderByAz(props.nameDog)}>a-z</button>
        <button onClick={()=>props.orderByZa(props.state)}>z-a</button>
      </div>
      <Dogs array={(props.state)} />
      {/* <div><Pagination/></div> */}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    state: state.dogs,
    nameDog:state.searchName,
    pages :state.pages
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderByZa: (name) => dispatch(orderByZa(name)),
    orderByAz: (name) => dispatch(orderByAz(name))
    
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
//export default Home;
