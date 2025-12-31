require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connection = require("./db"); 

const loginRouter = require("./login");
const travelsRouter = require("./travels");
const bookingsRouter = require("./bookings");
const SignUpRouter = require("./SignUp");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", loginRouter);
app.use("/api", bookingsRouter);
app.use("/api", travelsRouter);
app.use("/api", SignUpRouter);

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

// DB test route
app.get("/test-db", (req, res) => {
  connection.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("DB test failed:", err);
      return res.status(500).json({ message: "DB test failed", error: err });
    }
    res.json({ message: "DB test OK", results });
  });
});

// Start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
