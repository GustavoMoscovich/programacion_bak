import { Router } from "express";
import Productdb from "../models/productdb.js";

const router = Router();

//CRUD

// crea un nuevo producto en la base de MongoDB
router.post("/", async (req, res, next) => {
  try {
    let oneprod = await Productdb.create(req.body);
    return res.status(201).json({
      success: true,
      message: `se ha creado el producto asignando el ID ${oneprod._id}`,
    });
  } catch (error) {
    next(error);
  }
});

// Obtiene la lista de productos de la base de MongoDB
router.get("/", async (req, res, next) => {
  try {
    console.log("paso por el get")
    let allproducts = await Productdb.find();
    return res.status(200).json({
      success: true,
      response: allproducts,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let oneprod = await Productdb.findByIdAndUpdate(id, data);
    return res.status(200).json({
      success: true,
      message: `el producto con ID ${oneprod._id} fue modificado`,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let oneprod = await Productdb.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: `el producto con ID ${oneprod._id} fue eliminado`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
