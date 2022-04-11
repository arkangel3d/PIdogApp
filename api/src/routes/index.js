const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const { sequelize, Dog, Temperament, Dog_Temperament } = require("../db");

const { idGenerator } = require("../../utils.js");
const { copyTemp } = require("../../copyTemperaments.js");

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const dogsApi = await axios.get(url);
  const dogsDataBase = await Dog.findAll({ include: Temperament });

  let response = dogsApi.data.concat(dogsDataBase);
  //await copyTemp(response); //COPIAR TEMPERAMENTOS DESDE LA API  A LA BASE DE DATOS
  if (name) {
    let dataArray = response.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(dataArray);
  }
  return res.json(response);
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dogsApi = await axios(url);
  const dogsDataBase = await Dog.findAll({ include: Temperament });
  let response = dogsApi.data.concat(dogsDataBase);
  const dataArray = response.find((dog) => dog.id === Number(id));
  if (!dataArray) return res.status(404).send("id no encontrado");
  return res.json(dataArray);
});

router.post("/dog", async (req, res) => {
  let { name, height, weight, life_span, temperament } = req.body;
  let id = idGenerator(name, life_span);

  try {
    let dog = await Dog.create({ id, name, height, weight, life_span });
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

    dog.dataValues.temperaments = temperament.join(", ");

    res.status(201).json(dog);
  } catch (error) {
    res.status(402).send(error);
  }
});
router.get("/temperament", async (req, res) => {
  try {
    const getTemperamentDataBase = await Temperament.findAll();
    res.json(getTemperamentDataBase);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
