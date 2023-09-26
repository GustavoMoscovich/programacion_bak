//CAPA DE ENRUTAMIENTO

import { Router } from "express";
import Router_main from "../router_main.js";
import ProductsController from "../../../controllers/products.controller.js";
//import Productdb from "../../../models/productdb.js";
import is_admin from "../../../middlewares/is_admin.js";
import verify_jwt_token_cookie from "../../../middlewares/verify_jwt_token_cookie.js";

const ProdsController = new ProductsController();

export default class ProdRouter extends Router_main {
    init() {

        // crea un nuevo producto en la base de MongoDB
        this.post("/",["PUBLIC"], async (req, res, next) => {
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
        this.read("/", ["PUBLIC"] , async (req, res, next) => {
        try {
            let response = await ProdsController.readController();
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
        this.read("/:id", ["PUBLIC"] , async (req, res, next) => {
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
    
        this.put("/:id",["ADMIN"], verify_jwt_token_cookie, is_admin , async (req, res, next) => {
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

        this.delete("/:id",["ADMIN"], verify_jwt_token_cookie, is_admin , async (req, res, next) => {
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

