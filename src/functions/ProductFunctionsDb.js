// se define la clase ProductFunctionsDb
// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Productdb from "../models/productdb.js";

export default class ProductFunctionsDb {
  // método que devuelve el total de productos
  getProducts = async () => {
    try {
      await connect(
        "mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce"
      );
      let allproducts = await Productdb.find().lean();
      const resultado = Object.values(allproducts);
      return resultado;
    } catch (error) {
      return error;
    }
  };
}
