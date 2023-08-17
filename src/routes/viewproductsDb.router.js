import { Router } from "express";
import ProductFunctionsDb from "../functions/ProductFunctionsDb.js";

const router = Router();
const prodManagerDb = new ProductFunctionsDb("");

router.get('/' ,async (req, res) => {
    const {limit} = req.query
    const prod = await prodManagerDb.getProducts( (typeof(limit)=='undefined'? 10 : limit));
    res.render('index',  {prod} )

})

export default router;
