const express = require("express");
const app = express();
const clientRoutes = require("./routes/cliente.js");
const planRoutes = require("./routes/plan.js");

const multer = require('multer');
const path = require('path');

let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./numerocedula')
  },
  filename:(req,file,cb)=>{
    cb(null, file.fielname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage});

//Setting
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
// app.get('/',(req,res)=>{
//     res.send('wel')
// })
app.use('/client',clientRoutes);
app.use('/plan',planRoutes); 

 
// file
app.post('/subir',upload.single('file'),(req,res)=>{
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  return res.send(req.file);
})


//Starting  the server
app.listen(app.get("port"), () => {
  console.log("Server on port 3000", app.get("port"));
});