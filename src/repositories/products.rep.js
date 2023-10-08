import dao from "../dao/factory.js";
const { Prod } = dao;

export default class ProdsRepository {
  constructor() {
    this.model = new Prod();
  }
  createModel = (data) => this.model.create(data);
  readModels = (id) => this.model.read(id);
  updateModel = (id, data) => this.model.update(id, data);
  destroyModel = (id) => this.model.destroy(id);
}
