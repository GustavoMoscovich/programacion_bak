import User from "../dao/mongo/models/userdb.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default (req, res, next) => {
  const auth = req.cookies;
  //console.log(auth.token);
  if (!auth.token) {
    return res.status(401).json({
      success: false,
      response: "Las Credenciales son inválidas",
    });
  }
  const token = auth.token


  jwt.verify(token, config.SECRET_KEY, async (error, credentials) => {
    //credentials son los datos DESTOKENIZADOS del token
    try {
      let user = await User.findOne({ email: credentials.mail });

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        response: "Las Credenciales son inválidas",
      });
    }
  });
};
