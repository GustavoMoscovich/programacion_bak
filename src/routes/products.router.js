import { Router } from "express";
import ProductFunctions from "../functions/ProductFunctions.js";

const router = Router();

const prodManager = new ProductFunctions("./files/products.json");

// si se pasa el query ?limit=XX devuelve solo los XX productos caso contrario se pasan todos los productos
router.get("/", (req, res) => {
  const { limit } = req.query;

  const products = prodManager.getProducts();
  if (Number(limit) > 0) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

// busca productos por ID. Si existe el ID buscado devuelve el objeto, caso contrario muestra mensaje que no existe
router.get("/:id", (req, res) => {
  const prodId = Number(req.params.id);
  const product = prodManager.getProductById(prodId);

  if (Object.keys(product).length != 0) {
    res.send(product);
  } else {
    res.send([]);
  }
});

// alta de nuevos productos
router.post("/", (req, res) => {
  const product = req.body;

  const arrayProducts = prodManager.getProducts();

  // valida los datos que se reciben
  if (!product.code || !product.description) {
    return res.status(400).send({ status: "error", error: "faltan datos" });
  }

  product.id =
    arrayProducts.length === 0
      ? 1
      : arrayProducts[arrayProducts.length - 1].id + 1;
  arrayProducts.push(product); // Agrego al array
  prodManager.addToFile(JSON.stringify(arrayProducts, null, "\t"));
  res.send({ status: "success", message: "producto creado" });
});

// modifica producto por ID
router.put("/:id", (req, res) => {
  const product = req.body;
  const prodId = Number(req.params.id);
  const arrayProducts = prodManager.getProducts();

  // valida los datos que se reciben
  if (!product.code || !product.description) {
    return res.status(400).send({ status: "error", error: "faltan datos" });
  }

  const pInd = arrayProducts.findIndex((product) => product.id === prodId);

  if (pInd !== -1) {
    arrayProducts[pInd] = { id: arrayProducts[pInd].id, ...product };
    prodManager.addToFile(JSON.stringify(arrayProducts, null, "\t"));
    res.send({ status: "success", message: "producto modificado" });
  }
});

// elimina producto por ID
router.delete("/:id", (req, res) => {
  const product = req.body;
  const prodId = Number(req.params.id);
  const arrayProducts = prodManager.getProducts();

  const pInd = arrayProducts.findIndex((product) => product.id === prodId);

  if (pInd !== -1) {
    arrayProducts.splice(pInd, 1);
    prodManager.addToFile(JSON.stringify(arrayProducts, null, "\t"));
    res.send({ status: "success", message: "producto eliminado" });
  } else {
    return res
      .status(400)
      .send({ status: "error", error: "id de producto no existe" });
  }
});

export default router;
