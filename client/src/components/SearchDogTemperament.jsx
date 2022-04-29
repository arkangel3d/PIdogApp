import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogById } from "../actions";
const axios = require("axios");

export const SearchDogTemperament = () => {
  const [temp, setTemp] = useState([]);
  const [inputTemp, setInputTemp] = useState([]);
  const [dogTemperaments, setDogTemperaments] = useState([]);
  const [dogsFill, setDogsFill] = useState([]);
            
  const dispatch = useDispatch();

  async function getTemperaments() {
    let data = await axios.get("http://localhost:3001/temp");
    //.then((data=> data.map((temp)=> temp.name) ))

    return setTemp(data.data);
  };

  async function getdDogsTemperaments() {
    let data = await axios.get("http://localhost:3001/temperament");
    //.then((data=> data.map((temp)=> temp.name) ))

    return setDogTemperaments(data.data);
  };

  const onFilter = (inputTemp, dogsFill) => {
    if (dogsFill.length > 0) {
      let array = [];
      dogsFill.forEach((dog) => {
        dog.temperament.split(", ").forEach((t) => {
          if (inputTemp[inputTemp.length - 1] === t) {
            array.push(dog);
          }
        });
      });
      //  let temperamentFill = [...new Set(array)]
      return setDogsFill(array);
    }
    
    dogTemperaments.forEach((dogT) => {
      if (inputTemp[inputTemp.length - 1] === dogT.temperament) {
        setDogsFill(dogT.raza);
      }
    });
  };
  const reFilter = (array, temp) => {
    let temperaments = [];
    array.forEach((dog) => {
      let dataTemperament = dog.temperament?.split(", ");
      dataTemperament?.forEach((element) => {
        temp.forEach((e) => {
          if (e.name === element) {
            temperaments.push(e);
          }
        });
      });
    });

    let temperamentFill = [...new Set(temperaments)];

    return setTemp(temperamentFill);
  };
  //*MONTAJE DEL COMPONENTE */
  useEffect(() => {

    getdDogsTemperaments();
    getTemperaments();

  }, []);

  const handleClick = (inputTemp, dogsFill) => {
    onFilter(inputTemp, dogsFill);
    // setButton()
  };
  const handleClickReset = () => {
    setInputTemp([]);
    getdDogsTemperaments();
    getTemperaments();
    setDogsFill([]);
  };
//   const setButton=()=>{
//     // inputTemp.includes()
   
//     let set =temp.some((t)=>t.name===inputTemp[inputTemp.length-1])
//     console.log(set)
//     setEnable(set)
//   }
 
//*ACTUALIZACION DEL COMPONENTE */
  useEffect(() => {
    reFilter(dogsFill, temp);
    // eslint-disable-next-line
  },[dogsFill]);


  return (
    <div>
      <div>
        {inputTemp.map((e,i)=><p key={i}>{e}</p>)}
        <button
          disabled={inputTemp.length === 0 && temp.length === 0}
          onClick={() => handleClick(inputTemp, dogsFill)}
        >
          Buscar
        </button>
        <button disabled={!inputTemp} onClick={() => handleClickReset()}>
          Reiniciar
        </button>

        <div>
          {dogsFill &&
            dogsFill.map((d) => (
              <Link key={d.id}
                to={`/dog/${d.id}`}
                onClick={() => dispatch(getDogById(d.id))}
                
              >
                <p >{d.name}</p>
              </Link>
            ))}
        </div>

        <div>
          
          {temp.length > 0
            && temp.map((t) => (
                <li
                  key={t.id}
                  onClick={() => setInputTemp([...inputTemp, t.name])}
                >
                  <button 
                    // disabled={inputTemp.length>0&&temp.find((t)=>t.name===inputTemp[inputTemp.length-1])}
                  >
                    {t.name}
                  </button>
                </li>
              ))
            }
        </div>
      </div>
    </div>
  );
};
//dispatch(getDogById(id))
