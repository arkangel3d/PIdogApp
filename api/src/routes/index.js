const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const response = await axios.get(url);
  if (name) {
    // const urlQueryName = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`;
    // const response = await axios.get(urlQueryName);
    // return res.json(response.data);
   let dataArray = response.data.filter((dog)=> dog.name.toLowerCase().includes(name.toLowerCase()))
    return res.json(dataArray);
  }
  return res.json(response.data);
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios(url);
  const dataArray = response.data.find(dog => dog.id === Number(id));
  if(!dataArray) return res.status(404).send('id no encontrado')
  return res.json(dataArray);
});
module.exports = router;
