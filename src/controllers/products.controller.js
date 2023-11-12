//CAPA CONTROLADORA
//dirige a servicios

import ProductsService from "../services/products.service.js";

export default class ProductsController {
  constructor() {
    //tiene que construir una instancia de los servicios del modelo
    this.service = new ProductsService();
  }
  createController(data) {
    console.log("Create Capa Controladora")
    let response = this.service.createService(data);
    return response;
  }
  readController(limit, page) {
    let response = this.service.readService(limit, page);
    return response;
  }
  readOneController(id) {
    let response = this.service.readOneService(id);
    return response;
  }
  updateController(id, data) {
    let response = this.service.updateService(id, data);
    return response;
  }
  destroyController(id) {
    let response = this.service.destroyService(id);
    return response;
  }
}