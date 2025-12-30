const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/bookings", (req, res) => {
  const CustomerID = req.body.CustomerID;
  const TravelID = req.body.TravelID;
  const q = "INSERT INTO bookings( `CustomerID`, `TravelID`) VALUES (?,?)";
 
  db.query(q, [CustomerID,TravelID], (err, data) => {
    if (err) return res.status(500);
    return res.json(data);
  });
});
  

module.exports = router;
