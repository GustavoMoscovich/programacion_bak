//CAPA DE PERSISTENCIA (mongo)
//es la encargada de realizar el CRUD

import { json } from "express";
import Carts from "./models/cartdb.js";

export default class CartsMongo {
    constructor() {}
    async create(data) {
      let one = await Carts.create(data);
      return {
        message: "Producto Agregado al Carrito",
        response: "cart_id: " + one._id,
      };
    }

    async read(id) {
        let products = await Carts.find({ user_id: id }, " -__v" )
            .sort({type: 1})
            .populate("user_id","email");

        if ( products.length > 0 ) {
          let cartdetail = await Carts.aggregate([
            { $match: { id } },
            { $set: { subtotal: { $multiply: ["10", "$quantity"] } } },
            { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
            {
              $project: {
                _id: 0,
                user_id: "$_id",
                total: "$total",
                date: new Date(),
              },
            },
          ]);


          return {
            message: "Producto Encontrado..!",
            response: products,
            cartdetail,
          };
        } else {
          return null;
        }
      }

    async update(id, data) {
      let one = await Carts.findByIdAndUpdate(id, data, { new: true });
      if (one) {
        return {
          message: "Producto Modificado",
          response: one,
        };
      } else {
        return null;
      }
    }

    async destroy(id) {
      let deleted = await Carts.findAndDelete({ user_id: id });
      if (deleted) {
        return {
          message: "Productos del carrito borrados",
          response: deleted,
        };
      } else {
        return null;
      }
    }

  }