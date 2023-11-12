//CAPA DE ENRUTAMIENTO

import { Router } from "express";
import Router_main from "../router_main.js";
import ProductsController from "../../../controllers/products.controller.js";
import is_admin from "../../../middlewares/is_admin.js";
import verify_jwt_token_cookie from "../../../middlewares/verify_jwt_token_cookie.js";

const ProdsController = new ProductsController();

export default class ProdRouter extends Router_main {
    init() {

        // crea un nuevo producto en la base de MongoDB
        this.post("/", ["PUBLIC"], async (req, res, next) => {
            try {
                console.log("Create Capa Enrutamiento")
                let data = req.body
                let response = await ProdsController.createController(data);
                return res.sendSuccessCreate(response);
            } catch (error) {
                next(error);
            }
        });

        // Obtiene la lista de productos de la base de MongoDB
        this.read("/:limit/:page", ["PUBLIC"], async (req, res, next) => {
            try {
                const {page} = req.params
                const {limit} = req.params
                let response = await ProdsController.readController((typeof(limit)=='undefined'? 9 : limit), (typeof(page)=='undefined'? 1 : page) );
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Productos")
                }
            } catch (error) {
                next(error);
            }
        });

        // Obtiene un producto de la base de MongoDB
        this.read("/:id", ["PUBLIC"], async (req, res, next) => {
            try {
                let { id } = req.params;
                let response = await ProdsController.readOneController(id);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Producto")
                }
            } catch (error) {
                next(error);
            }
        });

        this.put("/:id", ["PUBLIC"], verify_jwt_token_cookie, is_admin, async (req, res, next) => {
            try {
                let { id } = req.params;
                let data = req.body;
                let response = await ProdsController.updateController(id, data);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Producto")
                }

            } catch (error) {
                next(error);
            }
        });

        this.delete("/:id", ["PUBLIC"], verify_jwt_token_cookie, is_admin, async (req, res, next) => {
            try {
                let { id } = req.params;
                let response = await ProdsController.destroyController(id);
                if (response) {
                    return res.sendSuccess(response);
                } else {
                    return res.sendNotFound("Producto")
                }
            } catch (error) {
                next(error);
            }
        });

    }
}

