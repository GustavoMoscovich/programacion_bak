import env from "../../src/config/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";
const { Cart } = dao;
const { Prod } = dao;

const requester = supertest(`http://localhost:${env.PORT_WEB}/api`);

describe(">>>>> Testing PRODUCTS and CARTS integrated with AUTH <<<<<", () => {
  const model = new Cart();
  let data_cart = {}
  const data_prod = {
    title: "TEST COLMI 22G BLACK",
    description: "Smartwatch muy completo con varias funciones para monitoreo de estado de salud",
    code: "TEST_CO5565BL",
    price: 36700,
    status: true,
    stock: 125,
    category: "TESTING",
    thumbnails: ["http://url_de_foto_del_producto_01", "http://url_de_foto_del_producto_02"]
  };

  let data_user = {
    name: "Juan Testing",
    email: "juantesting@coder.com",
    password: "1234asdf",
    role: 0,
  };

  let id_user = null;
  let id_product = null;
  let token = {};

  it("Must register a simple user", async () => {
    const response = await requester.post("/auth/register").send(data_user);
    const { _body, statusCode } = response;
    id_user = _body._id;
    expect(statusCode).to.be.equals(201);
  });

  it("Must log in as simple user", async () => {
    const response = await requester.post("/auth/login").send(data_user);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  });

  
  it("Must change user type from simple to premium", async () => {
    const response = await requester
      .post("/auth/premium/juantesting@coder.com")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });


  // creación de un producto para luego ser usado en el carrito de compras
  it("Must create a new product to be used in the cart testing and respond with statusCode = 201", async () => {
    const response = await requester
      .post("/products")
      .send(data_prod)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response;
    id_product = _body.response.product_id;
    expect(statusCode).to.be.equals(201);
  });

  it("Must update stock in new product created in this process and respond with statusCode = 200", async () => {
    const response = await requester
      .put("/products/" + id_product)
      .send({ stock: 2700 })
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  // realiza un alta en el carrito de compras usando el _ID del producto creado en el testing
  it("Must add the new product created in the cart and respond with statusCode = 201", async () => {
    data_cart = { product_id: id_product, quantity: 2500 }
    const response = await requester
      .post("/carts")
      .send(data_cart)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response;
    expect(statusCode).to.be.equals(201);
  });

  it("Must respond with an array of products in database using pagintaion (collect only 9 products from page 1)", async () => {
    const response = await requester
      .get("/products/3/1")
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body } = response;
    expect(Array.isArray(_body.response.products.docs)).to.be.equals(true);
  });

  it("Must respond with an array of products in the cart", async () => {
    const response = await requester
      .get("/carts")
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body } = response;
    expect(Array.isArray(_body.response)).to.be.equals(true);
  });

  it("Must update quantity product in the cart and respond with statusCode = 200", async () => {
    const response = await requester
      .put("/carts/" + id_product + "/10")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Must destroy a product in the cart", async () => {
    const response = await requester
      .delete("/carts/" + id_product)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response
    expect(statusCode).to.be.equals(200)
  });

  it("Must destroy the new product created in this test process and return 200", async () => {
    const response = await requester
      .delete("/products/" + id_product)
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response
    expect(statusCode).to.be.equals(200)
  });

  it("Must sign out an premium user", async () => {
    const response = await requester.post("/auth/signout").set("Cookie", [token.key + "=" + token.value])
    const { statusCode, _body } = response
    expect(statusCode).to.be.equals(200)
  })

  it("Must destroy a user", async () => {
    let response = await requester.delete("/auth/" + id_user).set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

});