const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();

router.post("/login", (req, res) => {
  console.log("Login request body:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password missing" });
  }

  console.log("Executing DB query...");

  db.query(
    `SELECT UserID, Username, Password, RoleID FROM users WHERE Username = ?`,
    [username],
    (err, rows) => {
      if (err) {
        console.error("DB error:", err);
        return res.sendStatus(500);
      }

      console.log("DB result:", rows);

      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = rows[0];

      if (user.Password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.UserID, role: user.RoleID },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      const data = {
        id: user.UserID,
        username: user.Username,
        role: user.RoleID
      };

      res.json({ data, token });
    }
  );
});

module.exports = router;
