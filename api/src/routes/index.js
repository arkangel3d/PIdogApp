const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const { sequelize, Dog, Temperament, Image } = require("../db");

const { idGenerator, sortData, sortDogsApi } = require("../../utils.js");
const { copyTemp } = require("../../copyTemperaments.js");

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  const { name,limit, offset } = req.query;
  
  const dogsApi = await axios.get(url);
  const dogsApiSorted = dogsApi.data.map((d)=>{
    const {id,name, height, weight, life_span, temperament, image} =d;
    return sortDogsApi(id,name, height, weight, life_span, temperament, image)
  })
  const dogsDataBase = await Dog.findAll({ include: Temperament, });
  
  const data = dogsDataBase.map(async(dog) => {
    const { id, name, height, weight, life_span, temperaments, imageId } = dog;
    return await sortData(id, name, height, weight, life_span, temperaments, imageId);
  });
  const dataResults = await Promise.all(data);

  const SortArray=(x, y)=>{
    return x.name.localeCompare(y.name);
  };
  let response = dogsApiSorted.concat(dataResults).sort(SortArray);
// ++++COPIAR TEMPERAMENTOS DESDE LA API  A LA BASE DE DATOS+++++
        //  await copyTemp(response); 
  if (name) {
    let dataArray = response.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    if(dataArray.length ===0 )return res.send('No se encuentra raza');
    return res.json(dataArray);
  }if(limit && offset){
    let data = response.slice(limit,offset);
    return res.json(data)
  }
  return res.json(response);
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  
  const dogsApi = await axios.get(url);
  const dogsApiSorted = dogsApi.data.map((d)=>{
    const {id,name, height, weight, life_span, temperament, image} =d;
    return sortDogsApi(id,name, height, weight, life_span, temperament, image)
  })
  const dogsDataBase = await Dog.findAll({ include: Temperament, });
  
  const data = dogsDataBase.map(async(dog) => {
    const { id, name, height, weight, life_span, temperaments, imageId } = dog;
    return await sortData(id, name, height, weight, life_span, temperaments, imageId);
  });
  const dataResults = await Promise.all(data)
  let response = dogsApiSorted.concat(dataResults);
  const dataArray = response.find((dog) => dog.id === Number(id));
  if (!dataArray) return res.status(404).send("id no encontrado");
  return res.json(dataArray);
});

router.post("/dog", async (req, res) => {
  let { name, height, weight, life_span, temperament,image } = req.body;
 
  let id = idGenerator(name, life_span);

  try {
    let dog = await Dog.create({ id, name, height, weight, life_span });
    // fooInstance.createBar()
      // await dog.createImage({image:image});
      let imagen = await dog.createImage({image:image});
      
    let getIdsTemperaments = await temperament.map(async (element) => {
      let responseTemp = await Temperament.findOne({
        where: {
          name: { [Op.iLike]: `%${element}` },
        },
      });
      return responseTemp?.dataValues.id;
    });
    let idsTemperaments = await Promise.all(getIdsTemperaments);

    await dog.setTemperaments(idsTemperaments);

    dog.dataValues.temperament = temperament.join(", ");
    dog.dataValues.image = imagen;
    res.status(201).json(dog);
  } catch (error) {
    res.status(402).send(error);
  }
});
router.get("/temperament", async (req, res) => {
  const dogsApi = await axios.get(url);
  const dogsDataBase = await Dog.findAll({ include: Temperament });
  
  const dogsApiSorted = dogsApi.data.map((d)=>{
    const {id,name, height, weight, life_span, temperament, image} =d;
    return sortDogsApi(id,name, height, weight, life_span, temperament, image)
  })
  // let response = dogsApi.data.concat(dogsDataBase);
  const data = dogsDataBase.map(async(dog) => {
    const { id, name, height, weight, life_span, temperaments, imageId } = dog;
    return await sortData(id, name, height, weight, life_span, temperaments, imageId);
  });
  const dataResults = await Promise.all(data)
  let response = dogsApiSorted.concat(dataResults);
  const getTemperamentDataBase = await Temperament.findAll();
  let temperamentDog = getTemperamentDataBase.map((element) => {
    let arrayDogs = [];
    response.forEach((dog) => {
      let arrayTemperamets = dog.temperament?.split(", ");

      if (arrayTemperamets?.some((t) => t === element.name)) {
        arrayDogs.push({id:dog.id,name:dog.name,temperament:dog.temperament});
      }
    });
    let obj = {
      id : element.id,
      temperament: element.name,
      raza: arrayDogs,
    };
    return obj;
  });
  res.json(temperamentDog);
  
});
router.get('/temp', async(req, res)=>{
  try {
    const response = await Temperament.findAll();
    
    res.json(response)
  } catch (error) {
    res.send(error)
  }
  
  
})
module.exports = router;
