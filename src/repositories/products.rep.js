import dao from "../dao/factory.js";
const { Prod } = dao;

export default class ProdsRepository {
  constructor() {
    this.model = new Prod();
  }
  createModel = (data) => this.model.createModel(data);
  readModels = (id) => this.model.readModels(id);
  updateModel = (id, data) => this.model.updateModel(id, data);
  destroyModel = (id) => this.model.destroyModel(id);
}
