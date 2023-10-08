import args from "../config/arguments.js";
import MongoConnect from "../config/Mongo.js";
import env from "../config/config.js";

let dao = {}; //objeto donde voy a tener los diferentes modelos SEGUN la presistencia elegida al iniciar el srevidor

switch (args.persistence) {
  case "MEMORY":
    console.log("memory: connected");
    break;
  case "FS":
    console.log("file system: connected");
    const { default: CartFs } = await import("./fs/carts.fs.js");
    const { default: ProdFs } = await import("./fs/products.fs.js");
    dao = { Cart: CartFs, Prod: ProdFs };

    break;
  default: //"MONGO"
    const mongo = new MongoConnect(env.LINK_DB);
    mongo.connect_mongo();
    const { default: CartMongo } = await import("./mongo/carts.mongo.js");
    const { default: ProdMongo } = await import("./mongo/products.mongo.js");
    dao = { Cart: CartMongo, Prod: ProdMongo };
    break;
}

export default dao;
