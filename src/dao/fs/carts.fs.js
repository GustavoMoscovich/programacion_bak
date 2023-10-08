// se define la clase ProductFunctions
// los datos van a persistir en archivo
import fs from "fs";
import env from "../../config/config.js";

let cartpath = env.FILE_SYSTEM + '/carts.json'

export default class CartsFileSystem {
  constructor() {
    this.path = cartpath;
  }

  async create(data) {
    //await fs.promises.writeFile(this.path, JSON.stringify(data));
    fs.readFile(this.path, 'utf8', (error, cartcontent) => {
      let cart = { product: [] }
      if (!error) {
        cart = JSON.parse(cartcontent)
      }

      cart.product = [...cart.product, data]
      fs.writeFileSync(this.path, JSON.stringify(cart))
    }

    );
    return {
      message: "Producto Agregado al Carrito",
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
    let cart = JSON.parse(data)
    return {
      message: "Productos del Carrito",
      response: cart,
    };
  };

  async destroy(id) {
    let cart = { product: [] }

    fs.writeFileSync(this.path, JSON.stringify(cart))
    return {
      message: "Carrito Borrado",
      
    }
  };
}