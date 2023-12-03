import 'dotenv/config.js'

import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import config from './config/config.js';
import __dirname from "./utils.js";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from 'express-session';
import MongoStore from "connect-mongo";
import inicializePassport from './middlewares/passport.js'
import passport from 'passport'
import commpression from "express-compression"
import winston from './middlewares/winston.js';
import swaggerJSDoc from "swagger-jsdoc";
import { serve,setup } from "swagger-ui-express"

import viewproductsRouter from "./routes/viewproducts.router.js";
import viewproductsRouterDb from "./routes/viewproductsDb.router.js";
import viewcartsDb from "./routes/viewcartsDb.router.js";
import registerDb from "./routes/registerDb.router.js";
import newProductDb from "./routes/newProductDb.router.js"
import loginDb from "./routes/loginDb.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "../src/middlewares/notFoundHandler.js";
import ProductFunctionsDb from "../src/functions/ProductFunctionsDb.js";
import cookieRouter from "./routes/api/cookiesRouter.js";
import sessions_router from "./routes/api/sessionsRouter.js";
import productsMocks from "./dao/datamocks/products.mocks.js"
import simpleRouter from "../src/routes/api/simple.router.js"
import complexRouter from "../src/routes/api/complex.router.js"

// Swagger
import options from "./config/swagger.js";
const specs = swaggerJSDoc(options)

// implementación de auth usando router como clase
import AuthRouter from "../src/routes/api/mongodb/auth.router_main.js"
const authClass = new AuthRouter()
const userRouterDb = authClass.getRouter()

// implementación de products usando router como clase
import ProdRouter from "../src/routes/api/mongodb/productsDb.router_main.js"
const prodClass = new ProdRouter()
const prodRouterDb = prodClass.getRouter()

// implementación de carts usando router como clase
import CartRouter from "../src/routes/api/mongodb/cartsDb.router_main.js"
const cartClass = new CartRouter()
const cartRouterDb = cartClass.getRouter()


// se define el port TCP para el servidor WEB y la conexión a MongoDB

const PORT = config.PORT_WEB // define el puerto TCP para el servidor web

const ready = () => {
  console.log('servidor web activo en puerto ' + PORT)
  connect(config.LINK_DB)
    .then(() => console.log('Conexión a Base de datos OK...'))
    .catch(err => console.log(err))
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// middlewares
app.use(commpression({
  brotli: { enable: true, zlib: {} },
}));
app.use(cookieParser(config.SECRET_COOKIE));
app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: config.LINK_DB,
    ttl: 60 * 60 * 24 * 7
  }),
  secret: config.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));
inicializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use(winston);

// implementación HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Lista de productos
app.use("/", viewproductsRouterDb);
//Carrito
app.use("/cart", viewcartsDb);
//app.use("/cart/carthtml", cartRouterDb);

//Registro de usuarios
app.use("/register", registerDb);
//Registro de nuevos productos
app.use("/newproduct", newProductDb);
//Login
app.use("/login", loginDb);

// acceso a las APIs de productos, carritos, cookies, etc.
app.use("/api/products", prodRouterDb); // se configura para que trabaje con el Route que opera con MongoDB
app.use("/api/carts", cartRouterDb); // se configura para que trabaje con el Route que opera con MongoDB
app.use("/api/auth", userRouterDb);
app.use("/api/cookies", cookieRouter);
app.use("/api/sessions", sessions_router);
app.use("/api/mockingproducts", productsMocks);
app.use("/api/simple",simpleRouter);
app.use("/api/complex",complexRouter);
app.use("/api/docs", serve, setup(specs))

app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, ready);
