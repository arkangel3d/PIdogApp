import React from "react";
import Dogs from "./Dogs";
import { connect } from "react-redux";
import {
  orderByZa,
  orderByAz,
  orderByWeight,
  orderByWeightHigh,
} from "../actions";

import Pagination from "./Pagination";

function Home(props) {
  return (
    <div>
      <div>
        <button onClick={() => props.orderByAz()}>a-z</button>
        <button onClick={() => props.orderByZa()}>z-a</button>
        <button onClick={() => props.orderByWeight(props.state)}>
          weight -
        </button>
        <button onClick={() => props.orderByWeightHigh(props.state)}>
          weight +
        </button>
      </div>
      <div>
        <Dogs array={props.pages} />
        <div>
        <Pagination />
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    state: state.dogs,
    nameDog: state.searchName,
    pages: state.pages,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderByZa: (name) => dispatch(orderByZa(name)),
    orderByAz: (name) => dispatch(orderByAz(name)),
    orderByWeight: (array) => dispatch(orderByWeight(array)),
    orderByWeightHigh: (array) => dispatch(orderByWeightHigh(array)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default Home;
