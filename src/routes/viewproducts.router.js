import { Router } from "express";
import ProductFunctions from "../functions/ProductFunctions.js";

const router = Router();
const prodManager = new ProductFunctions("./files/products.json");

const prod = prodManager.getProducts();

router.get('/' ,(req, res) => {
    res.render('index', { prod })

})

export default router;
