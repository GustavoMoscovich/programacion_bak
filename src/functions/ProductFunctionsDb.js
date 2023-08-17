// se define la clase ProductFunctionsDb
// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Productdb from "../models/productdb.js";

export default class ProductFunctionsDb {
  // método que devuelve el total de productos
  getProducts = async (limit) => {
    try {
      await connect(
        "mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce"
      );
      //let allproducts = await Productdb.find().lean();
      let allproducts = await Productdb.paginate({},{limit})

      const res = Object.values(allproducts);
      const resultado = JSON.parse( JSON.stringify(res[0]) ) 
      console.log(JSON.parse( JSON.stringify(resultado[0]) ))
      return resultado;
    } catch (error) {
      return error;
    }
  };
}
