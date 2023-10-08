// se define la clase ProductFunctions
// los datos van a persistir en archivo
import fs from "fs";
import env from "../../config/config.js";

let prodpath = env.FILE_SYSTEM+'/products.json'

export default class ProductsFileSystem {
  constructor() {
    this.path = prodpath;
  }

  async create(data) {

    fs.readFile(this.path, 'utf8', (error, prods) => {
      let products = {   }
      if (!error) {
        products = JSON.parse(prods)
      }

      products = [...products, data]
      fs.writeFileSync(this.path, JSON.stringify(products))
    }

    );
    return {
      message: "Producto Agregado...",
    }
  };


  update = (id, data) => {
    if (fs.existsSync(path)) {
      try {
        const data = fs.readFileSync(path, "utf-8");
        const dataJSON = JSON.parse(data);
        return dataJSON;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Archivo no existe");
      return [];
    }
  };

  async read(id) {
    const data = fs.readFileSync(this.path, "utf-8");
    let products = JSON.parse(data)
    return {
      message: "Productos Encontrados",
      response: products,
    };
  };

  async destroy(id) {
    let products = {  }

    fs.writeFileSync(this.path, JSON.stringify(cart))
    return {
      message: "Productos Borrados",
      
    }
  };
}
