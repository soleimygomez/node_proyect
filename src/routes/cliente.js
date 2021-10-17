var express = require("express");
var router = express.Router();

const connection = require("../database.js");

// GET All Client
router.get("/all", (req, res) => {
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
router.get("/:cedula", (req, res) => {
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
router.post("/register", (req, res) => {
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
// PUT An Update Cliente document
router.put("/updateDocument/:cedula", (req, res) => {
  const { id } = req.params;
  const { documento } = req.body;
  const sql = ` UPDATE cliente SET documento='${documento}' 
    WHERE id =${id};
    `;
  connection.query(sql, (err) => {
    if (err) throw err;
    res.send("Cliente Update!");
  });
});

// PUT An Update Cliente
router.put("/update/:cedula", (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, telefono, direccion, correo } = req.body;
  const sql = ` UPDATE cliente SET nombre='${nombre}', apellido='${apellido}', telefono='${telefono}' , direccion='${direccion}' ,correo='${correo}' 
  WHERE cedula =${cedula};
  `;
  connection.query(sql, (err) => {
    if (err) throw err;
    res.send("Client Update!");
  });
});




module.exports = router;
