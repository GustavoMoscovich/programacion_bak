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

  const user = await verificar(req,res)

});

async function verificar (req,res)  {
  const auth = req.cookies;
  let user = {}
  if (!auth.token) {
    return {}
  } else {
    const token = auth.token
    jwt.verify(token, config.SECRET_KEY, async (error, credentials) => {
      //credentials son los datos DESTOKENIZADOS del token
      //try {
        //console.log("en try credentials ",credentials)
        const newuser = await User.findOne({ email: credentials.mail });
        const onecart = await Ca_Controller.read(newuser._id)
        const xxx = JSON.stringify( onecart.response)
        const products = JSON.parse(xxx)
        res.render("cart", { products });
        return newuser
      //} catch (error) {
      //  console.log("en catch", error)
      //  return {}
      //};
    }) 
  }
}

export default router;
