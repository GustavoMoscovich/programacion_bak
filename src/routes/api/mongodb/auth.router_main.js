
//
// este Reouter es utilizado para el registro de usuarios y el login usando
// métodos de hasheo de claves, passport y la utilización de servicios de terceros
// Este router reemplaza al router userDb.router.js que hace lo mismo pero sin aplicar seguridad 
// en datos sensibles
// además este router hace uso de router avanzado reutilizando código de router_main.js

import { Router } from "express";
import Router_main from "../router_main.js";
import User from "../../../dao/mongo/models/userdb.js";
import is_form_ok from "../../../middlewares/is_form_users_ok.js";
import is_8_char from "../../../middlewares/is_8_char.js";
import create_hash from "../../../middlewares/create_hash.js";
import is_valid_user from "../../../middlewares/is_valid_user.js";
import is_valid_pass from "../../../middlewares/is_valid_pass.js";
import passport from "passport";
import create_token from "../../../middlewares/create_token.js";
import verify_jwt_token_cookie from "../../../middlewares/verify_jwt_token_cookie.js";


export default class AuthRouter extends Router_main {
    init() {        
        this.post(
        "/register",["PUBLIC"],
        is_form_ok,
        is_8_char,
        create_hash,
        passport.authenticate("register"),
        async (req, res, next) => {
            try {
            return res.sendSuccessCreate({
                success: true,
                response: "Se ha creado el usuario asignando el ID "+req.user._id,
                message: "Se ha creado el usuario asignando el ID "+req.user._id,
            });
            } catch (error) {
            next(error);
            }
        }
        );

        // login implementando passport y generación de JWT token
        this.post(
        "/login",["PUBLIC"],
        is_8_char,
        passport.authenticate("login"),
        is_valid_pass,
        create_token, // middleware que obtiene JWT token
        async (req, res, next) => {
            try {
            req.session.email = req.body.email;
            req.session.role = req.user.role;
            return res.status(200)
                        .cookie("token", req.session.token, {
                        maxAge: 60 * 60 * 24 * 7 * 1000,
                        httpOnly: false,
                        })      
                        .json({
                        user: req.user,
                        message: 'el usuario ' + req.session.email + ' inició sesión',
                        token: req.session.token
                        });
            } catch (error) {
            next(error);
            }
        }
        );

        this.post(
          "/signout",["PUBLIC"],
          passport.authenticate("jwt"),
          async (req, res, next) => {
            try {
              //console.log(req.session);
              req.session.destroy();
              return res.status(200).clearCookie("token").json({
                success: true,
                message: "sesion cerrada",
                response: req.session,
              });
            } catch (error) {
              next(error);
            }
          }
        );
    }
}
