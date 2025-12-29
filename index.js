// index.js
const express = require("express");
const cors = require("cors");

const loginRouter = require("./login");
const travelsRouter = require("./travels");

const app = express();


app.use(cors());
app.use(express.json()); 

// Routes
app.use("/api", loginRouter);
app.use("/api", travelsRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
