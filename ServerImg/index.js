const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs')
const multer = require('multer');
const server = express();
const path = require('path');
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
const disksStorage = multer.diskStorage({
  destination: path.join(__dirname, './images'),
  filename:(req, file,cb)=>{
      cb(null,file.originalname)
  }
});
 
const fileUpload = multer({
  storage: disksStorage

}).single('image')

server.get('/prueba', (req,res) =>{

   let img= fs.readFileSync(__dirname + "/images/test.jpg");
   return res.set('content-type', 'image/jpeg').send(img)
})

server.get('/dog/:image',(req,res)=>{
  const { image } = req.params;
  let img= fs.readFileSync(__dirname + `/images/${image}`);
  return res.set('content-type', 'image/jpeg').send(img)
});

server.post('/image/dog',fileUpload, (req,res)=>{
 
 res.sendStatus(201)
})

  server.listen(5001, () => {
    console.log('%s listening at 5001'); 
  });

