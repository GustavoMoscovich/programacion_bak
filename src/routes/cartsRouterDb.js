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
    let onecart = await Cartdb.findByIdAndUpdate(id, data);
    return res.status(200).json({
      success: true,
      message: `el carrito con ID ${onecart._id} fue modificado`,
    });
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

export default router;
