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
const checkQuery = "SELECT 1 FROM users WHERE Username = ?";
  db.query(checkQuery, [Username], (err, result) => {
    if (err) {
      console.error("Signup - DB error (check):", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    if(isNaN(Phone) || Phone < 0 && Phone !== undefined) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
  

  const q = "INSERT INTO users( `Username`, `Password`, `FullName`, `Email`, `Phone`, `RoleID`) VALUES (?,?,?,?,?,?)";

  db.query(q, [Username,Password,FullName,Email,Phone,RoleID], (err, data) => {
    if (err) return res.status(500);

    return res.status(201).json(data);
  });
});
});

module.exports = router;