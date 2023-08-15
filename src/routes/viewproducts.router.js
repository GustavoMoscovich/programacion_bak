import { Router } from "express";
import ProductFunctions from "../functions/ProductFunctions.js";

const router = Router();
const prodManager = new ProductFunctions("./files/products.json");

console.log('paso por viewProducts.router....')

//const prod = prodManager.getProducts();

router.get('/' ,(req, res) => {
    const prod = prodManager.getProducts();
    console.log('paso por el get de viewProducts.router....')
    res.render('index', { prod })

})

export default router;
