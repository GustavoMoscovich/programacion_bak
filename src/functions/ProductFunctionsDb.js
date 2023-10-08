// se define la clase ProductFunctionsDb
// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Productdb from "../dao/mongo/models/productdb.js";
import config from "../config/config.js";

export default class ProductFunctionsDb {
  // método que devuelve el total de productos
  getProducts = async (limit,search,page) => {
    try {
      await connect(
        config.LINK_DB
      );

      const options = {
        page: page,
        limit: limit,
        select: '_id title code price status stock category thumbnails'
      }
      let allproducts = await Productdb.paginate({title: {$regex: search, $options: 'i'}  },options)

      const res = JSON.parse( JSON.stringify(allproducts) )
      const resultado = res

      return resultado;
    } catch (error) {
      return error;
    }
  };
}
