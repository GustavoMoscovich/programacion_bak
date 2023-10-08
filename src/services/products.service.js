//CAPA DE SERVICIOS
//brindar servicios segun la persistencia
//intermediario entre persistencia y control

//import ProductsMongo from "../dao/mongo/products.mongo.js";  // invoca a la capa de persistencia 
import ProdsRepository from "../repositories/products.rep.js";

export default class ProductsService {
  constructor() {
    //tiene que construir una instancia del modelo a la cual le tiene que configurar los diferentes servicios para CRUD
    this.model = new ProdsRepository();
  }
  createService(data) {
    console.log("Create Capa Servicios")
    let response = this.model.createModel(data);
    return response;
  }
  readService() {
    let response = this.model.readModels();
    return response;
  }
  readOneService(id) {
    let response = this.model.readOneModel(id);
    return response;
  }
  updateService(id, data) {
    let response = this.model.updateModel(id, data);
    return response;
  }
  destroyService(id) {
    let response = this.model.destroyModel(id);
    return response;
  }
}
