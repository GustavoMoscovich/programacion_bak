import { Router } from "express";
import ProductFunctions from "../functions/ProductFunctions.js";

const router = Router();
const prodManager = new ProductFunctions("./files/products.json");

router.get('/' ,(req, res) => {
    const prod = prodManager.getProducts();
    res.render('index', { prod })

})

export default router;
