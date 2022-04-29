import style from "./Styles.module.css";
import React, { useState} from 'react'
const axios = require('axios');

const Registrar = () => {
    let inputImg = React.createRef();
    const [input, setInput] = useState({
        name:'', 
        height1:'',
        height2:'', 
        weight1:'',
        weight2:'', 
        life_span1:'',
        life_span2:'',
    });
    const [temp, setTemp] = useState('');
    const [inputTemp, setInputTemp] = useState([]);
    const [urlImg, setUrlImg] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [status,setStatus] = useState('');
    const [statusFile,setStatusFile] = useState('');
    const [errorsTemps ,setErrorsTemps] = useState('Debes ingresar por lo menos 3 temperamentos');
    const [errors,setErrors] = useState({
        name:'', 
        height1:'',
        height2:'', 
        weight1:'',
        weight2:'', 
        life_span1:'',
        life_span2:'',
        
    });
    
    async function getTemperaments(){
       
        let data= await axios.get('http://localhost:3001/temp')
         
         setTemp(data.data)
        return data.data
    };

    function validate(input) {
        let errors = {};
        
        if (!input.name) {
          errors.name = 'Username is required';
          
        } 
       if(!Number(input.height1)){
        errors.height1 = 'Only numbers'
       }
       if(!Number(input.height2)){
        errors.height1 = 'Only numbers'
       }
       if(input.height2<input.height1){
         errors.height2 = 'debe ser mayor al numero anterior ingresado'
       }
       if(!Number(input.weight1)){
        errors.weight1 = 'Only numbers'
       }
       if(!Number(input.weight2)){
        errors.weight1 = 'Only numbers'
       }
       if(input.weight2<input.weight1){
         errors.weight2 = 'debe ser mayor al numero anterior ingresado'
       }
       if(!Number(input.life_span1)){
        errors.life_span1 = 'Only numbers'
       }
       if(!Number(input.life_span2)){
        errors.life_span1 = 'Only numbers'
       }
       if(input.life_span2<input.life_span1){
         errors.life_span2 = 'debe ser mayor al numero anterior ingresado'
       }
                     
        return errors
      };

      const validateTemps=(input)=>{
        let error =''
        if(input.length<=3){
            error = 'Debes ingresar por lo menos 4 temperamentos'
        }
        return error
    }
    function handleOnchance(e){
     
        setInput({...input,
            [e.target.name]: e.target.value
        })
        setErrors(()=>validate({
            ...input,
          [e.target.name]: e.target.value
          
        
        }))
    };
    
     function handleImage(e){
         let urlName = `http://localhost:5001/dog/${e.target.files[0].name}`;
        
         setUrlImg(urlName);
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
       
        setImgFile(formData);
         
    
    };
    const handleOnchanceTemp =(e)=>{
       
        setInputTemp([...inputTemp,
            e.target.value]
        )
        setErrorsTemps(validateTemps([...inputTemp,e.target.value]))
    }
     
    const onDeleteTemps=(inputTemp)=>{
        let newTemps =inputTemp.filter((e)=>e!==inputTemp[inputTemp.length-1])
        setErrorsTemps(validateTemps(newTemps))
        return setInputTemp(newTemps)
    }
    
   
     function handleOnSubmit(e,inputs,temperaments,image,file){
        e.preventDefault();
        
        if(!urlImg) alert('no has elegido una imagen');
        
         axios.post('http://localhost:5001/image/dog', file)
        .then(res => setStatusFile(true))
        .catch(err=>{ 
            return setStatusFile('error en imagen vuelve a intentar')});
        const { name, height1,height2, weight1,weight2, life_span1,life_span2,} = inputs;

        let obj ={
            name,
            height:`${height1} - ${height2}`,
            weight:`${weight1} - ${weight2}`,
            life_span:`${life_span1} - ${life_span2}`,
            image : image,
            temperament: temperaments

        }
        axios.post('http://localhost:3001/dog',obj)
        .then(data=>{
            setInput({ 
            name:'', 
            height1:'',
            height2:'', 
            weight1:'',
            weight2:'', 
            life_span1:'',
            life_span2:'',})
            
            
            setInputTemp([])
            document.getElementById('form').reset();
            setImgFile('')
            setStatus(`Raza registrada con exito con el id ${data.data.id}`)
            // console.log(data)
        })
        .catch(err=>setStatus('Por favor verifica los datos, e intenta nuevamente'))
      
       
    } 
   
    const { name, height1,height2, weight1,weight2, life_span1,life_span2} = input; 
   
    return ( 
    <div>
        
        <form id="form" className={style.form} onSubmit={(e)=>handleOnSubmit(e,input,inputTemp,urlImg,imgFile)}>
            {<p>{status}</p>}
            {<p>{statusFile}</p>}
            <label className={style.label} >Name</label>
            <input autoComplete={'nope'} name={'name'} type={'text'} onChange={(e)=>handleOnchance(e)} value={name}/>
            <p>{errors.name}</p>
            <label className={style.label}>Height</label>
            <input autoComplete={'nope'} className={style.input} name={'height1'} type={'text'} onChange={(e)=>handleOnchance(e)} value={height1}/>
            <input autoComplete={'nope'} className={style.input} name={'height2'} type={'text'} onChange={(e)=>handleOnchance(e)} value={height2}/>
            <p>{errors.height1} {errors.height2}</p>
            <label className={style.label}>Weight</label>
            <input autoComplete={'nope'} className={style.input} name={'weight1'} type={'text'} onChange={(e)=>handleOnchance(e)} value={weight1}/>
            <input autoComplete={'nope'} className={style.input} name={'weight2'} type={'text'} onChange={(e)=>handleOnchance(e)} value={weight2}/>
            <p>{errors.weight1} {errors.weight2}</p>
            <label className={style.label}>Life Span</label>
            <input autoComplete={'nope'} className={style.input} name={'life_span1'} type={'text'} onChange={(e)=>handleOnchance(e)} value={life_span1}/>
            <input autoComplete={'nope'} className={style.input} name={'life_span2'} type={'text'} onChange={(e)=>handleOnchance(e)} value={life_span2}/>
            <p>{errors.life_span1} {errors.life_span2}</p>
   
            <p>{input.life_span1&&input.life_span2? 'Clic en el boton temperaments para elegir':null}</p>
            <input type={'button'} value={'temperaments'} onClick={()=>getTemperaments()}/><br/>
            {temp&&<textarea type={'text'} value={inputTemp} readOnly/>}
            <p>{errorsTemps}</p>
            {temp&&<input type={'button'} onClick={()=>onDeleteTemps(inputTemp)} value={'Delete'}/>}
            
            <label className={style.label}>Image</label>
            <input type={'file'} id='img' accept={'image/jpeg'} ref={inputImg} onChange={(e)=>handleImage(e)} />
            
            <div className={style.submitP}>
            <input disabled={ imgFile &&!errorsTemps && Object.keys(errors).length===0?false:true} className={style.submit} type={'submit'} value={'enviar'}/>
            </div>
            
         
            
        </form>
        <div className={style.temps}>
        
         {temp ? temp.map((t)=><li key={t.id} onClick={(e)=>handleOnchanceTemp(e)}><button name={'temperament'}  value={t.name}>{t.name}</button></li>): null}
        </div>
        
        </div> );
}
 
export default Registrar;