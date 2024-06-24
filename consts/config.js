require("dotenv").config();

const APP_PORT = process.env.APP_PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "";

module.exports = {
  APP_PORT,
  DATABASE_URL,
};
