import dao from "../dao/factory.js";
const { Prod } = dao;

export default class ProdsRepository {
  constructor() {
    this.model = new Prod();
  }
  createModel = (data) => this.model.createModel(data);
  readModels = (limit, page) => this.model.readModels(limit, page);
  readOneModel = (id) => this.model.readOneModel(id);
  updateModel = (id, data) => this.model.updateModel(id, data);
  destroyModel = (id) => this.model.destroyModel(id);
}
