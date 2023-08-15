import { Router } from "express";
import ProductFunctionsDb from "../functions/ProductFunctionsDb.js";

const router = Router();
const prodManagerDb = new ProductFunctionsDb("");

//const prod = await prodManagerDb.getProducts();

//console.log('Paso por el route viewproductDb..')

router.get('/' ,async (req, res) => {
    const prod = await prodManagerDb.getProducts();
    //console.log('Paso por el get de viewproductDb.route....')
    //console.log({prod})
    res.render('index',  {prod} )

})

export default router;
