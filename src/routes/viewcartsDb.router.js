import { Router } from "express";
import CartFunctionsDb from "../functions/CartsFunctionsDb.js";

const router = Router();
const cartManagerDb = new CartFunctionsDb();

router.get('/' ,async (req, res) => {
    const cart = await cartManagerDb.getCart();
    res.render('cart',  {cart} )

})

export default router;
