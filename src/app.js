import 'dotenv/config.js'


import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from 'express-session';
import MongoStore from "connect-mongo";
import inicializePassport from './middlewares/passport.js'
import passport from 'passport'


//
import viewproductsRouter from "./routes/viewproducts.router.js";
import viewproductsRouterDb from "./routes/viewproductsDb.router.js";
import viewcartsDb from "./routes/viewcartsDb.router.js";
import registerDb from "./routes/api/mongodb/registerDb.router.js";
import newProductDb from "./routes/api/mongodb/newProductDb.router.js"
import loginDb from "./routes/api/mongodb/loginDb.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "../src/middlewares/notFoundHandler.js";
import ProductFunctionsDb from "../src/functions/ProductFunctionsDb.js";
import cookieRouter from "./routes/cookiesRouter.js";
import sessions_router from "./routes/sessionsRouter.js";


//********* Para manejo de datos usando File System  ************ */
import prodRouter from "../src/routes/api/products.router.js";
import cartRouter from "../src/routes/api/cartsRouter.js";


//********* Para manejo usando Mongoose  ************ */
import prodRouterDb from "../src/routes/api/mongodb/productsDb.router.js";
import cartRouterDb from "../src/routes/api/mongodb/cartsRouterDb.js";
//import userRouterDb from "../src/routes/usersDb.router.js"
import userRouterDb from "../src/routes/api/mongodb/auth.js"


// se define el port TCP para el servidor WEB y la conexión a MongoDB
const PORT = 8080 // define el puerto TCP para el servidor web
const ready = ()=> {
  console.log('servidor web activo en puerto '+PORT)
  connect('mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce')
    .then(()=>console.log('Conexión a Base de datos OK...'))
    .catch(err=>console.log(err))
}

//********* Para manejo usando archivos  ************ */
//import ProductFunctions from "./functions/ProductFunctions.js";
//const prodManager = new ProductFunctions("./files/products.json");
//const products = prodManager.getProducts();
//************************** */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// middlewares
app.use(cookieParser('clave_cookie_back'));
app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce',
    ttl: 60*60*24*7
  }),
  secret: 'clave_session_back',
  resave: true,
  saveUninitialized: true
}));
inicializePassport()
app.use(passport.initialize())
app.use(passport.session())


// implementación HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Lista de productos
app.use("/", viewproductsRouterDb);

//Carrito
app.use("/cart", viewcartsDb);

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


app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT,ready);
const pepito = process.env.RASTAMAN

console.log('rastaman... ', pepito)

const prodManagerDb = new ProductFunctionsDb();
const products = await prodManagerDb.getProducts();

// implementación de Websockets
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("equipo conectado");
  socket.emit("listOfProducts",   products  );
});
