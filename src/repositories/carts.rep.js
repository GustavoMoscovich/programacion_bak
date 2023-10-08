import dao from "../dao/factory.js";
const { Cart } = dao;

export default class CartsRepository {
  constructor() {
    this.model = new Cart();
  }
  create = (data) => this.model.create(data);
  read = (id) => this.model.read(id);
  update = (id, data) => this.model.update(id, data);
  destroy = (id) => this.model.destroy(id);
}
