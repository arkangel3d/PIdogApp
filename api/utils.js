const { Image } = require("./src/db");
let idGenerator=(name,life_span) =>{
    let num1 = Number(life_span.slice(0,1));
    let num2 = name.length;
    let num3 = Math.floor(Math.random()*10)
    let num4 = Math.floor(Math.random()*100)
     return 300+num2+num1*num3*num4
    };

let sortData = async(id,name, height, weight, life_span, temperaments, imageId)=>{
       
    let image = await Image.findByPk(imageId);
        image?.toJSON();
    let dog = {
        id,
        name,
        height,
        weight,
        life_span,
        temperament : temperaments?.map((t)=>t.name).join(', '),
        image : {
            id : image.id,
            url : image.image
        }

    }
    return dog;
};
let sortDogsApi =(id,name, height, weight, life_span, temperament, image)=>{
       
    
    let dog = {
        id,
        name,
        height,
        weight,
        life_span,
        temperament,
        image : {
            id : image.id,
            url : image.url
        }

    }
    return dog;
};

module.exports = {
    idGenerator,
    sortData,
    sortDogsApi
}