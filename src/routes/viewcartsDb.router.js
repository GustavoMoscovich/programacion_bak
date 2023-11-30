import { Router } from "express";
import User from "../dao/mongo/models/userdb.js";
//import CartFunctionsDb from "../functions/CartsFunctionsDb.js";
import CartsController from "../controllers/carts.controller.js";
//import verify_jwt_token_cookie from "../middlewares/verify_jwt_token_cookie.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


const router = Router();
const Ca_Controller = new CartsController();

router.get("/", async (req, res) => {

  const user = await verificar(req, res)

});

async function verificar(req, res) {
  const auth = req.cookies;
  let user = {}
  if (!auth.token) {
    res.render("cart");
    //return {}
  } else {
    const token = auth.token
    jwt.verify(token, config.SECRET_KEY, async (error, credentials) => {
      const newuser = await User.findOne({ email: credentials.mail });
      const onecart = await Ca_Controller.read(newuser._id)
      const products = JSON.parse(JSON.stringify(onecart))
      //products.totalcart = onecart.cart_total[0].total
      res.render("cart", products);
      return newuser
    })
  }
}

export default router;
