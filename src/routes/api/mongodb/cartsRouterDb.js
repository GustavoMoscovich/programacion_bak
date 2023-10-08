import { Router } from "express";
import Cartdb from "../../../models/cartdb.js";

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

// Obtiene la lista de productos del carrito de un usuario
router.get("/", async (req, res, next) => {
  try {
    let allcarts = await Cartdb.find({user_id: '64cc17b302a4e5bd2baa41f6'});
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
router.put("/:uid/product/:pid/:units", async (req, res, next) => {
  try {
    let { uid } = req.params;
    let { pid } = req.params;
    let { units } = req.params;

    // busco el producto pid  del usuario uid
    let findresult = await Cartdb.find(
      { $and: [{ user_id: uid }, { product_id: pid }] },
      { product_id: 1, quantity: 1, _id: 0 }
    ).lean();

    if (JSON.stringify(findresult) != "[]") {

      // el producto existe en el carrito. Entonces le modifico la cantidad.. 
      let data = JSON.parse(`{ "quantity": ${Number(units)} }`);
      let onecart = await Cartdb.findOneAndUpdate({ $and: [{ user_id: uid }, { product_id: pid }] }, data);
      return res.status(200).json({
        success: true,
        message: `el producto fue modificado en el carrito`,
      });
    } else {
      // el producto NO existe en el carrito, entonces lo doy de alta

      let data = JSON.parse(`{ "product_id": "${pid}", "quantity": ${Number(units)}, "user_id": "${uid}" }`);
      let onecart = await Cartdb.create(data);
      return res.status(200).json({
        success: true,
        message: `el producto ID ${pid} fue agregado en el carrito`,
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
