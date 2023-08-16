
// los datos van a persistir en base de datos de MongoDb
import { connect } from "mongoose";
import Cartdb from "../models/cartdb.js";
import Productdb from "../models/productdb.js";

export default class CartFunctionsDb {

  // método que devuelve el total de productos del carrito
  getCart = async () => {
    try {
      await connect('mongodb+srv://gmsisit:1234@gm-sis-it.pmsndu8.mongodb.net/ecommerce')
      console.log('pase por punto 1............................')
      let allcart = await Cartdb.find ({_id: "64cc17b302a4e5bd2baa41f6"}).populate('products')
      const resultado = Object.values(allcart);
      console.log('resultado: ', resultado.json())
      return resultado     
      
    } catch (error) {
      return error;
    }
  };
}
