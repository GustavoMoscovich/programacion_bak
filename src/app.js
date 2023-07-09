import express from "express";
import handlebars from "express-handlebars";
import prodRouter from "../src/routes/products.router.js";
import cartRouter from "../src/routes/cartsRouter.js";
import viewproductsRouter from "./routes/viewproducts.router.js";
import viewRealTimeProducts from "./routes/realtimeproducts.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";

//********************* */
import ProductFunctions from "./functions/ProductFunctions.js";
const prodManager = new ProductFunctions("./files/products.json");
const products = prodManager.getProducts();
//************************** */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// implementación HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// muestra la lista de productos por medio de HandleBars
app.use("/", viewproductsRouter);

//Activa lista de productos en real time por Websockets
app.use("/realtimeproducts", viewRealTimeProducts);

// acceso a las APIs de productos y carrito
app.use("/api/products", prodRouter);
app.use("/api/carts", cartRouter);

const server = app.listen(8080, () =>
  console.log("Servidor Express en puerto 8080")
);

// implementación de Websockets
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("equipo conectado");

  socket.emit("listOfProducts", { products });
});
