//CAPA CONTROLADORA
//dirige a servicios

import CartsService from "../services/carts.service.js";

export default class CartsController {
  constructor() {
    //tiene que construir una instancia de los servicios del modelo
    this.service = new CartsService();
  }
  create(data) {
    console.log("Create Capa Controladora")
    let response = this.service.create(data);
    return response;
  }
  read(id) {
    let response = this.service.read(id);
    return response;
  }
 
  update(id, data) {
    let response = this.service.update(id, data);
    return response;
  }
  destroy(id) {
    let response = this.service.destroy(id);
    return response;
  }
}