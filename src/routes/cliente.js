var express = require("express");
var router = express.Router();
const cors = require("cors");
var multer = require("multer");
const connection = require("../database.js");
const path = require("path");
 

// GET All Client
router.get("/all", cors(), (req, res) => {
  //   res.send("entra");
  connection.query("SELECT * FROM cliente", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An Client
router.get("/:cedula", cors(), (req, res) => {
  const { cedula } = req.params;
  connection.query(
    "SELECT * FROM cliente WHERE cedula = ?",
    [cedula],
    (err, rows, fields) => {
      if (err) {
        res.json(rows[0]);
        console.log("no se encontro registrado el cliente", cedula);
      } else {
        console.log(err);
      }
    }
  );
});

//POST An Register Cliente
router.post("/register", cors(), (req, res) => {
  const sql = "INSERT INTO cliente SET ?";

  const clientObj = {
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    correo: req.body.correo,
    documento: req.body.documento,
  };

  connection.query(sql, clientObj, (err) => {
    if (err) throw err;
    res.send("Client Create!");
  });
});

let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./numerocedula')
  }
   
})

const upload = multer({storage});

// PUT An Update Cliente document
router.put("/updateDocument/:cedula",multer({storage,dest:path.join(__dirname,'../../numerocedula')}).single('documento'), (req, res) => {
  
  console.log(req.params);
  const cedula= req.params.cedula;
  console.log(cedula);
  const documentoObj = { documento:req.file }
  //console.log("cedi: ¿está definido?" , typeof cedulAa !== 'undefined');
  console.log("docuem: ¿está definido?" , typeof documentoObj !== 'undefined');
  
  const sql = ` UPDATE cliente SET documento='${documentoObj.documento}' 
     WHERE cedula =${cedula};
    `;
  connection.query(sql, (err) => {
     if (err) throw err;
    res.send("Cliente Update!");
   });
   
 
});

// PUT An Update Cliente
router.put("/update/:cedula", cors(), (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, telefono, direccion, correo } = req.body;
  const sql = ` UPDATE cliente SET nombre='${nombre}', apellido='${apellido}', telefono='${telefono}' , direccion='${direccion}' ,correo='${correo}',documento='${documento} 
  WHERE cedula =${cedula};
  `;
  connection.query(sql, (err) => {
    if (err) throw err;
    res.send("Client Update!");
  });
});

module.exports = router;
