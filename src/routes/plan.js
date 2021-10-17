var express = require("express");
var router = express.Router();

const connection = require("../database.js");

// GET All Plan
router.get("/all", (req, res) => {
  //   res.send("entra");
  connection.query("SELECT * FROM plan", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An Plan
router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM plan WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
        console.log("Se encontro registrado el plan", id);
      } else {
        console.log(err);
      }
    }
  );
});

//POST An Register plan

router.post("/register", (req, res) => {
  const sql = "INSERT INTO plan SET ?";

  const planObj = {
    monto: req.body.monto,
    interes: req.body.interes,
    cuotas: req.body.cuotas,
    forma_pago: req.body.forma_pago,
    valorcuota: req.body.valorcuota,
    cliente: req.body.cliente,
  };

  //   const calculo= planObj.monto*(planObj.interes*(Math.pow((1+planObj.interes,planObj.cuotas))/Math.pow((1+planObj.interes,planObj.cuotas))-1));

  connection.query(sql, planObj, (err) => {
    if (err) throw err;
    res.send("Plan Create!");
  });
  //   console.log("el valor de su man ",calculo);
});

// PUT An Update Plan valor cuota
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { valorcuota } = req.body;
  const sql = ` UPDATE plan SET valorcuota='${valorcuota}' 
    WHERE id =${id};
    `;
  connection.query(sql, (err) => {
    if (err) throw err;
    res.send("Plan Update!");
  });
});

module.exports = router;
