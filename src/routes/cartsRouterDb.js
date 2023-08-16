import { Router } from "express";
import Cartdb from "../models/cartdb.js";

const router = Router();

//CRUD

// crea un nuevo registro de carrito en la base de MongoDB
router.post("/", async (req, res, next) => {
  try {
    let onecart = await Cartdb.create(req.body);
    return res.status(201).json({
      success: true,
      message: `se ha registrado el carrito asignando el ID ${onecart._id}`,
    });
  } catch (error) {
    next(error);
  }
});

// Obtiene la lista de carritos de la base de MongoDB
router.get("/", async (req, res, next) => {
  try {
    let allcarts = await Cartdb.find();
    return res.status(200).json({
      success: true,
      response: allcarts,
    });
  } catch (error) {
    next(error);
  }
});

// modifica un carrito de la base de MongoDB
router.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = req.body;
    console.log("DATA 1: ", data);
    let onecart = await Cartdb.findByIdAndUpdate(id, data);
    return res.status(200).json({
      success: true,
      message: `el carrito con ID ${onecart._id} fue modificado`,
    });
  } catch (error) {
    next(error);
  }
});

// modifica un producto dentro del carrito de la base de MongoDB
// si el producto no existe en el carrito entonces lo agrega al mismo
router.put("/:cid/product/:pid/:units", async (req, res, next) => {
  try {
    let { cid } = req.params;
    let { pid } = req.params;
    let { units } = req.params;

    // busco el producto pid dentro del carrito cid
    let findresult = await Cartdb.find(
      { $and: [{ _id: cid }, { "products.id": pid }] },
      { "products.id": 1, "products.quantity": 1, _id: 0 }
    ).lean();

    if (JSON.stringify(findresult) != "[]") {
      // el producto existe en el carrito. Entonces le modifico la cantidad.. Pero tengo que leer todos los productos del carrito
      // para hacer la actualización y mantener todos los productos
      const upd_products = findresult[0].products.map((obj) => {
        obj.id = obj.id.toString();
        if (obj.id == pid) {
          obj.quantity = Number(units);
        }
        return obj;
      });
      let data = JSON.parse(
        '{ "products": ' + JSON.stringify(upd_products) + " }"
      );
      let onecart = await Cartdb.findByIdAndUpdate(cid, data);
      return res.status(200).json({
        success: true,
        message: `el producto con ID ${pid} fue modificado en el carrito`,
      });
    } else {
      // el producto NO existe en el carrito, entonces lo doy de alta en el mismo

      let data = JSON.parse(`{ "id": "${pid}", "quantity": ${Number(units)} }`);
      let onecart = await Cartdb.findByIdAndUpdate(cid, {
        $push: { products: data },
      });
      return res.status(200).json({
        success: true,
        message: `el producto con ID ${pid} fue agregado en el carrito`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// elimina un carrito de la base de MongoDB
router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let onecart = await Cartdb.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: `el carrito con ID ${onecart._id} fue eliminado`,
    });
  } catch (error) {
    next(error);
  }
});

// elimina el producto PID del carrito CID en la base de MongoDB
router.delete("/:cid/product/:pid", async (req, res, next) => {
  try {
    let { cid } = req.params;
    let { pid } = req.params;
    let onecart = await Cartdb.updateOne(
      { _id: cid },
      { $pull: { products: { id: pid } } }
    );
    return res.status(200).json({
      success: true,
      message: `el producto con ID ${pid} del carrito con ID ${cid} fue eliminado`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
