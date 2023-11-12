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
 
  update(user_id,pid,qty) {
    let response = this.service.update(user_id,pid,qty);
    return response;
  }
  destroy(user_id,pid) {
    let response = this.service.destroy(user_id,pid);
    return response;
  }
}