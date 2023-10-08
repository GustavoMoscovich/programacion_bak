import dotenv from "dotenv";
import command from "./arguments.js";

const environment = command.mode;
const path = environment === "dev" ? "./.env.dev" : "./.env.prod";

dotenv.config({ path });



export default {
  LINK_DB: 'mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce',
  SECRET_COOKIE: 'clave_cookie_back',
  SECRET_SESSION: 'clave_session_back',
  SECRET_KEY: 'T0k3nJWt',
  PORT_WEB: 8080,
  FILE_SYSTEM: '../files'
};
