import { Router } from "express";
import ProductFunctionsDb from "../functions/ProductFunctionsDb.js";

const router = Router();
const prodManagerDb = new ProductFunctionsDb("");

router.get('/' ,async (req, res) => {
    const prod = await prodManagerDb.getProducts();
    res.render('index',  {prod} )

})

export default router;
