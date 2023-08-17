import { Router } from "express";
import ProductFunctionsDb from "../functions/ProductFunctionsDb.js"



const router = Router();
const prodManagerDb = new ProductFunctionsDb("");

router.get('/' ,async (req, res) => {
    const {limit} = req.query
    const {search} = req.query
    const prod = await prodManagerDb.getProducts( (typeof(limit)=='undefined'? 6 : limit) , (typeof(search)=='undefined'? '' : search)  );
    res.render('index',  {prod} )

})

export default router;
