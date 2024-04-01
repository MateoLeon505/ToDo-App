import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config;

const pool = mysql
  .createPool({
    host: proccess.env.MYSQL_HOST,
    user: proccess.env.MYSQL_USER,
    password: proccess.env.MYSQL_PASSWORD,
    database: proccess.env.MYSQL_DATABASE,
  })
  .promise();
