const mysql = require('mysql2');

const connection = mysql.createPool({
  host: "interchange.proxy.rlwy.net",      // Railway host from Render env
  port: 10339,      // Railway port from Render env
  user: "root",      // Railway user from Render env
  password: "niXqYPtbzzQGRIMLrweCyEQqMpuaXhld",  // Railway password from Render env
  database: "railway"   // Railway DB name from Render env
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
