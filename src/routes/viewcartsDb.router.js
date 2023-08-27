import { Router } from "express";
import CartFunctionsDb from "../functions/CartsFunctionsDb.js";

const router = Router();
const cartManagerDb = new CartFunctionsDb();

router.get("/", async (req, res) => {
  const onecart = await cartManagerDb.getCart();
  let total = 0
  for (let prod of onecart.products) { // se obtiene el importe total del carrito
    total=total+(prod.quantity*prod.id.price)
  }
  onecart.totalprice=total
  res.render("cart",  onecart );
});

export default router;
