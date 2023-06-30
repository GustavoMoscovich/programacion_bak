import express from "express";
import prodRouter from "../src/routes/products.router.js";
import cartRouter from "../src/routes/cartsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", prodRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log("Servidor Express en puerto 8080"));
