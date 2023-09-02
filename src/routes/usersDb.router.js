// Este Ruter Graba a los usuarios en MongoDB
// Este Router es reemplazado por el router auth.js que aplica la misma funcionalidad
// pero aplicando medidas de seguridad para encriptar datos sensibles de los usuarios
// y los inicios de sesion
//

import { Router } from "express";
import Userdb from "../models/userdb.js";
import is_form_users_ok from "../middlewares/is_form_users_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import is_valid_user from "../middlewares/is_valid_user.js";

const router = Router();

// crea un nuevo usuario en la base de MongoDB
router.post("/register",is_form_users_ok, is_8_char ,async (req, res, next) => {
  try {
    let oneuser = await Userdb.create(req.body);
    return res.status(201).json({
      success: true,
      message: `se ha creado el usuario asignando el ID ${oneuser._id}`,
    });
  } catch (error) {
    next(error);
  }
});

// valida el usuario que intenta hacer el login
router.post('/login', is_8_char, is_valid_user, async(req,res,next)=> {
  try {
      req.session.email = req.body.email
      let one = await Userdb.findOne({email:req.body.email})  //recupero el usuario para identificar el rol
      req.session.role = one.role

      return res.status(200).json({
          session: req.session,
          message: req.session.email+' inició sesión'
      })
  } catch (error) {
      next(error)
  }
})


// realiza el des-logueo del usuario
router.post('/signout', async(req,res,next)=> {
  try {
      console.log('paso por signout....')
      req.session.destroy()
      return res.status(200).json({
          success: true,
          message: 'Se ha cerrado la sesión....',
          dataSession: req.session
      })
  } catch (error) {
      next(error)
  }
})


// Obtiene la lista de usuarios de la base de MongoDB
router.get("/", async (req, res, next) => {
  try {
    let allusers = await Userdb.find();
    return res.status(200).json({
      success: true,
      response: allusers,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
