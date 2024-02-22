import dotenv from "dotenv";
import path from "path";
// const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env`);
dotenv.config({ path: envPath });

const config = {
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  BASE_URL: process.env.BASE_URL,
  MAILTRAP_EMAIL: process.env.MAILTRAP_EMAIL,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
};

export default config;
