import dao from "../dao/factory.js";
const { Cart } = dao;

export default class CartsRepository {
  constructor() {
    this.model = new Cart();
  }
  create = (data) => this.model.create(data);
  read = (id) => this.model.read(id);
  update = (user_id,pid,qty) => this.model.update(user_id,pid,qty);
  destroy = (user_id,pid) => this.model.destroy(user_id,pid);
}
