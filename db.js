const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.DB_HOST,      // Railway host from Render env
  port: process.env.DB_PORT,      // Railway port from Render env
  user: process.env.DB_USER,      // Railway user from Render env
  password: process.env.DB_PASS,  // Railway password from Render env
  database: process.env.DB_NAME   // Railway DB name from Render env
});

// Test the connection
connection.getConnection((err, conn) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to Railway DB!");
    conn.release();
  }
});

module.exports = connection;
