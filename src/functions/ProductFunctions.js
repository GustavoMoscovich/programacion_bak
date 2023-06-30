// se define la clase ProductFunctions
// los datos van a persistir en archivo

import fs from 'fs';

export default class ProductFunctions {
    constructor(path) {
    this.path = path;
  }

  addToFile = async ( products) => {
    try {
      await fs.promises.writeFile(this.path, products);
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
      return []
    }
  };
  

  // método que devuelve el total de productos
  getProducts = () => {
    const data = this.readFile(this.path);
    return data;
  };

  // método que devuelve como objeto los datos del ID que
  // recibe como parámetro

  getProductById = (idProd) => {
    const products = this.readFile(this.path);
    //this.products = JSON.parse(data);
    const pInd = products.findIndex((product) => product.id === idProd);

    if (pInd === -1) {
      return [];
    }

    return products[pInd];
  };


}
