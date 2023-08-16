import { Router } from "express";
import CartFunctionsDb from "../functions/CartsFunctionsDb.js";

const router = Router();
const cartManagerDb = new CartFunctionsDb();

router.get("/", async (req, res) => {
  const onecart = await cartManagerDb.getCart();
  const cardet = onecart[0].products;
  res.render("cart", { cardet });
});

export default router;
