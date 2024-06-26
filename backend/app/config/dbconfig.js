const mysql = require('mysql2/promise');
require('dotenv').config();
const pool = mysql.createPool({
  host: process.env.DBLOCALHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
});

module.exports = {
  checkConnection: async function() {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the database');
      connection.release();
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  },
  pool
};
