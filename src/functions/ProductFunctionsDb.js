// se define la clase ProductFunctionsDb
// los datos van a persistir en base de datos de MongoDb

import Productdb from "../models/productdb.js";


export default class ProductFunctionsDb {

  // método que devuelve el total de productos
  getProducts = async () => {
    try {
      let allproducts = await Productdb.find();
      console.log('Lectura de Db: ', allproducts)
      return allproducts      
      
    } catch (error) {
      return error;
    }
  };
}
