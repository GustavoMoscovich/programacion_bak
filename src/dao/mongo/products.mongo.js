//CAPA DE PERSISTENCIA (mongo)
//es la encargada de realizar el CRUD

import Products from "./models/productdb.js";

export default class ProductsMongo {
  constructor() { }
  async createModel(data) {

    let one = await Products.create(data);
    return {
      message: "Producto Creado!",
      response: { product_id: one._id },
    };
  }
  async readModels() {
    let all = await Products.find();
    if (all.length > 0) {
      return {
        message: "Productos Encontrados!",
        response: { products: all },
      };
    } else {
      return null;
    }
  }
  async readOneModel(id) {
    let one = await Products.findById(id);
    if (one) {
      return {
        message: "Producto Encontrado!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async updateModel(id, data) {
    //id del modelo a modificar
    //data lo que tengo que modificar
    //let one = await Toy.findByIdAndUpdate(id,data) //devuele el objeto antes de la modificación
    let one = await Products.findByIdAndUpdate(id, data, { new: true });
    if (one) {
      return {
        message: "Producto Modificado!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async destroyModel(id) {
    let one = await Products.findByIdAndDelete(id);
    if (one) {
      return {
        message: "Producto Eliminado!",
        response: one,
      };
    } else {
      return null;
    }
  }
}
