const {Temperament} = require('./src/db.js')

const copyTemp = async(objs)=>{
    let temperaments = []
    objs.map((dog)=>{
        let dataTemperament = dog.temperament?.split(', ');
         dataTemperament?.forEach((element)=>{
            
          temperaments.push(element)
         })
      })
      
    let temperamentFill = [...new Set(temperaments)]
    
    
    await Promise.all(temperamentFill.map(async(temp)=> {
        if(temp){
            
            return await Temperament.create({name:temp})
        }
    }));
   
   
};

module.exports = {
    copyTemp
};