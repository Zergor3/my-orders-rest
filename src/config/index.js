import dotenv from "dotenv";

dotenv.config(); 

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "tito21maber11",
    database: process.env.DB_NAME || "orderapp",
  }
};

export default config;