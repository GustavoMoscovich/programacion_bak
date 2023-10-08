import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../../dao/mongo/models/userdb.js";
import config from "../../config/config.js";

export default class Router_main {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCb(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
  responses = (req, res, next) => {
    res.sendSuccessCreate = (payload) => res.status(201).json(payload);
    res.sendSuccess = (payload) => res.status(200).json(payload);
    //res.sendNotFound = payload => res.status(payload.status).json(payload.json)
    res.sendNotFound = () =>
      res.status(404).json({ success: false, response: "No Encontrado" });
    res.sendNoAuthenticatedError = (error) =>
      res.status(401).json({ status: "error", error });
    res.sendNoAuthorizatedError = (error) =>
      res.status(403).json({ status: "error", error });
    return next();
  };
  handlePolicies = (policies) => async (req, res, next) => {
    //definición de un array con funciones/roles que definen las politicas de acceso a las
    // operaciones/funciones que se brindan con la APP
    // Funciones/Roles que se definen ['PUBLIC','ENV','DEV','ADMIN']
    if (policies.includes("PUBLIC")) {
      return next();
    } else {
      const authHeaders = req.headers.authorization;
      if (!authHeaders) {
        return res.sendNoAuthenticatedError("Unauthenticated");
      } else {
        const tokenArray = authHeaders.split(" "); // tener en cuenta que el formato es Bearer token.token.token ["Bearer","token.token.token"]
        const token = tokenArray[1];
        const payload = jwt.verify(token, config.SECRET_KEY ); 
        const user = await User.findOne(
          { email: payload.mail },
          "email role"
        );
        const role = user.role;
        if (
          (policies.includes("USER") && role === 0) ||
          (policies.includes("ADMIN") && role === 1) ||
          (policies.includes("PREM") && role === 2)
        ) {
          req.user = user;
          return next();
        } else {
          return res.sendNoAuthorizatedError("Unauthorized");
        }
      }
    }
  };
  //create
  post(path, policies, ...cbs) {
    this.router.post(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //read
  read(path, policies, ...cbs) {
    this.router.get(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //update
  put(path, policies, ...cbs) {
    this.router.put(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //destroy
  delete(path, policies, ...cbs) {
    this.router.delete(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
}
