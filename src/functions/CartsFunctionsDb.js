// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Cartdb from "../dao/mongo/models/cartdb.js";
import Productdb from "../dao/mongo/models/productdb.js";
import config from "../config/config.js";

export default class CartFunctionsDb {
  // método que devuelve el total de productos del carrito
  getCart = async () => {
    try {
      await connect(
        config.LINK_DB
      );

      let allcart = await Cartdb.find({ _id: "64cc17b302a4e5bd2baa41f6" })
      const res = JSON.parse( JSON.stringify(allcart[0]) )
      const resultado = res

//      let allcart = await Cartdb.find({ _id: "64cc17b302a4e5bd2baa41f6" }).lean();
//      const resultado = Object.values(allcart);
      return resultado;
    } catch (error) {
      return error;
    }
  };
}
