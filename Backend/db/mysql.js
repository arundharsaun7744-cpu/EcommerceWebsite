// db/mysql.js

const knex = require("knex");

const mysql = require("mysql2/promise");

const db = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",             
    database: "ecommerce_db",  
  },
  pool: {
    min: 2,
    max: 10,
  },
});


db.raw("SELECT 1")
  .then(() => {
    console.log("✅ MySQL database connected successfully");
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

module.exports = db;
