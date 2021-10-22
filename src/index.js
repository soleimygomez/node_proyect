const express = require("express");
const app = express();
const clientRoutes = require("./routes/cliente.js");
const planRoutes = require("./routes/plan.js");
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
app.use(morgan('dev'));
var cors = require('cors');
app.use(cors());
app.options('*', cors())
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token,  X-Requested-With, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    next();
});

 

//Setting
app.set("port", process.env.PORT || 3001);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
// app.get('/',(req,res)=>{
//     res.send('wel')
// })
app.use('/client',clientRoutes);
app.use('/plan',planRoutes); 


let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./numerocedula')
  },
  filename:(req,file,cb)=>{
    cb(null, file.fielname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage});

// file
app.put('/subir/:cedula',upload.single('documento'),cors(),(req,res)=>{
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
   
  return res.send(req.file);
})

app.use(cors())

//Starting  the server
app.listen(app.get("port"), () => {
  console.log("Server on port 3001", app.get("port"));
});
