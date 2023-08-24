// se define la clase ProductFunctionsDb
// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Productdb from "../models/productdb.js";

export default class ProductFunctionsDb {
  // método que devuelve el total de productos
  getProducts = async (limit,search,page) => {
    try {
      await connect(
        "mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce"
      );

      const options = {
        page: page,
        limit: limit,
        select: '_id title code price status stock category thumbnails'
      }
      let allproducts = await Productdb.paginate({title: {$regex: search, $options: 'i'}  },options)

      const res = JSON.parse( JSON.stringify(allproducts) )
      console.log(res)
      const resultado = res

      return resultado;
    } catch (error) {
      return error;
    }
  };
}
