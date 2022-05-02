import { React, useState } from "react";
import { connect } from "react-redux";

import { getDogsByName,searchName } from "../actions";
import { useHistory } from "react-router-dom";
function SearchBar(props) {

  const[dog, setDog] = useState('');
  const history = useHistory()
 
  const  handleChange= (e)=> {
    setDog({
      [e.target.name]: e.target.value
    });
   
  };
  const handleSubmit= (e)=> {
    e.preventDefault();
     
    props.getDogsByName(dog.search)
    props.searchName(dog.search)
    history.push("/dogs");
  }
  const { title } = dog; 
  return (
   
      
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
           name="search"
            type={"text"}
            placeholder={"Search by Breeds"}
            onChange={(e) => handleChange(e)}
            value={title}
          />
          
          <input type="submit" value={"Search"}/>
          
          
        </form>
   
    
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getDogsByName: dogName => dispatch(getDogsByName(dogName)),
    searchName :dogName => dispatch(searchName(dogName))
  };
};

export default connect(null,mapDispatchToProps)(SearchBar);
