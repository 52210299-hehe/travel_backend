const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/SignUp", (req, res) => {
  
  const Username = req.body.Username;
  const Password = req.body.Password;
  const FullName = req.body.FullName;
  const Email = req.body.Email;
  const Phone = req.body.Phone;
  const RoleID = 2; 

  const q = "INSERT INTO users( `Username`, `Password`, `FullName`, `Email`, `Phone`, `RoleID`) VALUES (?,?,?,?,?,?)";

  db.query(q, [Username,Password,FullName,Email,Phone,RoleID], (err, data) => {
    if (err) return res.status(500);
    return res.json(data);
  });
});

module.exports = router;