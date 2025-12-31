const mysql = require('mysql2');

const host = process.env.DB_HOST || 'interchange.proxy.rlwy.net';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 10339;
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || 'niXqYPtbzzQGRIMLrweCyEQqMpuaXhld';
const database = process.env.DB_NAME || 'railway';

const poolConfig = { host, port, user, password, database };

console.log('DB config (host,port,user,database):', {
  host: poolConfig.host,
  port: poolConfig.port,
  user: poolConfig.user,
  database: poolConfig.database
});

const connection = mysql.createPool(poolConfig);

// Test the connection
connection.getConnection((err, conn) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to DB!');
    conn.release();
  }
});

module.exports = connection;
