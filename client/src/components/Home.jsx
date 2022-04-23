import React from "react";
import Dogs from "./Dogs";
import { connect } from "react-redux";
import { orderByZa,orderByAz } from "../actions";
import style from "./Styles.module.css";
//import { useSelector } from "react-redux";
import Pagination from './Pagination'

//import {setPagination} from '../utils.js'


function Home(props) {

  //const [dogsArray, setDogsArray] = useState([]);
  
 // const dispatch = useDispatch();
  //const state = useSelector((state) => state.dogs);

  

  return (
    <div>
      
      <div>
        <p>Ordenar</p>
        <button onClick={()=>props.orderByAz()}>a-z</button>
        <button onClick={()=>props.orderByZa()}>z-a</button>
      </div>
      <div >
      <Dogs array={(props.pages)} />
      <div className={style.pagination}><Pagination/></div>
      </div>
      
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
