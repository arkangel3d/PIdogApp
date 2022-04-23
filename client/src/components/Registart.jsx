import React, { useState} from 'react'
const axios = require('axios');
const Registrar = () => {
    // const API_KEY_IMG = 'a9960bc525ea9351a611a9b0ed5e8129';
    // const URL_IMG = `https://api.imgbb.com/1/upload?key=${API_KEY_IMG}&image=`;
    
    const [input, setInput] = useState({});
    const [temp, setTemp] = useState()
    const [inputTemp, setInputTemp] = useState([])
    //const [image64, setImg64] = useState(null)
    const [status,setStatus] = useState('')
    async function getTemperaments(){
       
        let data= await axios.get('http://localhost:3001/temp')
         //.then((data=> data.map((temp)=> temp.name) ))
         
         setTemp(data.data)
        return data.data
    };
  
    function handleOnchance(e){
        setInput({...input,
            [e.target.name]: e.target.value
        })
    
    };
  
    async function handleOnSelect(e){
   
    
    };
    
    

   
    function handleOnSubmit(e,inputs,temperaments,image){
        e.preventDefault();
        const { name, height1,height2, weight1,weight2, life_span,temperament,} = inputs;
        
        let obj ={
            name,
            height:`${height1} - ${height2}`,
            weight:`${weight1} - ${weight2}`,
            life_span,
            image:'url',
            temperament: temperaments

        }
        axios.post('http://localhost:3001/dog',obj)
        .then(data=>{
            setStatus(`Raza registrada con exito con el id ${data.data.id}`)
            setInput({})
            setInputTemp([])
            console.log(data)
        })
        .catch(err=>setStatus('Por favor verifica los datos, e intenta nuevamente'))
    };
    // const renderTemperaments = (array)=>{
    //     array.map((t)=><li onClick={()=>setInputTemp([...inputTemp,t.name])}>{t.name}</li>)
    // }
    const { name, height1,height2, weight1,weight2, life_span,temperament,} = input; 
    
    return ( <div>
        {status!==''&& <p>{status}</p>}
        <form onSubmit={(e)=>handleOnSubmit(e,input,inputTemp)}>
            <label>Name</label>
            <input name={'name'} type={'text'} onChange={(e)=>handleOnchance(e)} value={name}></input>
            <label>height</label>
            <input name={'height1'} type={'text'} onChange={(e)=>handleOnchance(e)} value={height1}></input>
            <input name={'height2'} type={'text'} onChange={(e)=>handleOnchance(e)} value={height2}></input>
            <label>weight</label>
            <input name={'weight1'} type={'text'} onChange={(e)=>handleOnchance(e)} value={weight1}></input>
            <input name={'weight2'} type={'text'} onChange={(e)=>handleOnchance(e)} value={weight2}></input>
            <label>life_span</label>
            <input name={'life_span'} type={'text'} onChange={(e)=>handleOnchance(e)} value={life_span}></input>
            
    
            <label>image</label>
            <input name={'image'} id={'foto'} type={'file'}/>
            <br></br>
            <input type={'button'} value={'temperaments'} onClick={()=>getTemperaments()}/>
            {temp?<input type={'text'} value={inputTemp}/>: null}
            <br></br>
            <input type={'submit'} value={'enviar'}/>
         
            
        </form>
        <div>
        
         {temp ? temp.map((t)=><li key={t.id} onClick={()=>setInputTemp([...inputTemp,t.name])}><button>{t.name}</button></li>): null}
        </div>
        </div> );
}
 
export default Registrar;