import express from "express";
import handlebars from "express-handlebars";
import prodRouter from "../src/routes/products.router.js";
import cartRouter from "../src/routes/cartsRouter.js";
import viewproductsRouter from "./routes/viewproducts.router.js";
import viewRealTimeProducts from "./routes/realtimeproducts.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { connect } from "mongoose";
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "../src/middlewares/notFoundHandler.js"
//********* Para manejo usando Mongoose  ************ */
import ProductFunctionsDb from "./functions/ProductFunctionsDb.js";
import prodRouterDb from "../src/routes/productsDb.router.js";

//


const PORT = 8080 // define el puerto TCP para el servidor web
const ready = ()=> {
  console.log('servidor web activo en puerto '+PORT)
  connect('mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/back_ecomm')
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
app.use(errorHandler);
//app.use(notFoundHandler);


// implementación HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// muestra la lista de productos por medio de HandleBars
app.use("/", viewproductsRouter);

//Activa lista de productos en real time por Websockets
app.use("/realtimeproducts", viewRealTimeProducts);

// acceso a las APIs de productos y carrito
app.use("/api/products", prodRouterDb);
app.use("/api/carts", cartRouter);

const server = app.listen(PORT,ready);

//const prodManagerDb = new ProductFunctionsDb("");
//const products = prodManagerDb.getProducts();

// implementación de Websockets
//const io = new Server(server);

//io.on("connection", (socket) => {
//  console.log("equipo conectado");

//  socket.emit("listOfProducts", { products });
//});
