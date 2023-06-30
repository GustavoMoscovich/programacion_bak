// se define la clase CartsFunctions
// los datos van a persistir en archivo

import fs from "fs";

export default class CartsFunctions {
  constructor(path) {
    this.path = path;
  }

  addToFile = async (carts) => {
    try {
      await fs.promises.writeFile(this.path, carts);
    } catch (error) {
      console.log(error);
    }
  };

  readFile = (path) => {
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

  // método que devuelve el total de carritos
  getCarts = () => {
    const data = this.readFile(this.path);
    return data;
  };

  // método que devuelve como objeto los datos del ID que
  // recibe como parámetro

  getCartsById = (idCarts) => {
    const carts = this.readFile(this.path);
    const pInd = carts.findIndex((cart) => cart.id === idCarts);

    if (pInd === -1) {
      return [];
    }

    return carts[pInd];
  };
}
