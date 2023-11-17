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
          let cart_total = await Carts.aggregate([ 
            { $match: { user_id: id } },
            { 
            $group: {             
              _id: null,
                total: { 
                    $sum: { $multiply: [ "$quantity","$price"]} 
                } 
            } 
        } ] )

          return {
            message: "Producto Encontrado..!",
            response: products,
            cart_total,
          };
        } else {
          return null;
        }
      }

    async update(user_id,pid,qty) {
      let one = await Carts.findOneAndUpdate( { $and: [ { user_id: user_id },{product_id: pid } ] }, {$set: {quantity: qty} }, { new: true });
      if (one) {
        return {
          message: "Producto Modificado",
          response: one,
        };
      } else {
        return null;
      }
    }

    async destroy(user_id,pid) {
      let deleted = await Carts.findOneAndDelete(  {$and: [ {user_id: user_id },{product_id: pid}] } );
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