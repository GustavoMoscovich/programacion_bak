//CAPA DE ENRUTAMIENTO

import { Router } from "express";
import Router_main from "../router_main.js";
import CartsController from "../../../controllers/carts.controller.js";
import is_admin from "../../../middlewares/is_admin.js";
import verify_jwt_token_cookie from "../../../middlewares/verify_jwt_token_cookie.js";
//import { log } from "winston";

const Ca_Controller = new CartsController();

export default class CartRouter extends Router_main {
    init() {

        // crea un nuevo producto en el carrito
        this.post("/", ["PUBLIC"], verify_jwt_token_cookie, async (req, res, next) => {
            try {
                let data = req.body
                data.user_id = req.user._id
                data.price=80
                let response = await Ca_Controller.create(data);
                return res.sendSuccessCreate(response);
            } catch (error) {
                next(error);
            }
        });

        // Obtiene la lista de productos del carrito

        this.read("/", ["PUBLIC"], verify_jwt_token_cookie, async (req, res, next) => {
            try {
                let user_id=req.user._id
                let response = await Ca_Controller.read(user_id);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Productos en carrito")
                }
            } catch (error) {
                next(error);
            }
        });

        this.put("/:pid/:qty", ["PUBLIC"], verify_jwt_token_cookie, async (req, res, next) => {
            try {
                let user_id=req.user._id
                let { pid } = req.params;
                let { qty } = req.params;
                let response = await Ca_Controller.update(user_id,pid,qty);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Producto en carrito")
                }

            } catch (error) {
                next(error);
            }
        });

        this.delete("/:pid", ["PUBLIC"], verify_jwt_token_cookie,  async (req, res, next) => {
            try {
                let user_id=req.user._id
                let { pid } = req.params;
                let response = await Ca_Controller.destroy(user_id,pid);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Productos en carrito")
                }
            } catch (error) {
                next(error);
            }
        });

    }
}