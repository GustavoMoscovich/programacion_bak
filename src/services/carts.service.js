//CAPA DE SERVICIOS
//brindar servicios segun la persistencia


//import CartsMongo  from "../dao/mongo/carts.mongo.js"; // invoca a la capa de persistencia

import CartsRepository from "../repositories/carts.rep.js";

export default class CartsService {
    constructor() {
      //tiene que construir una instancia del modelo a la cual le tiene que configurar los diferentes servicios para CRUD
      this.model = new CartsRepository();
    }
    create(data) {

      let response = this.model.create(data);
      return response;
    }
    read(id) {
      console.log('Carts capa de servicios')
      let response = this.model.read(id);
      return response;
    }

    update(id, data) {
      let response = this.model.update(id, data);
      return response;
    }
    destroy(id) {
      let response = this.model.destroy(id);
      return response;
    }
  }
  