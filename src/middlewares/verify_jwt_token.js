import User from "../models/userdb.js";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const auth = req.headers.authorization;
  //console.log(auth);
  if (!auth) {
    return res.status(401).json({
      success: false,
      message: "las credenciales ingresadas son inválidas",
    });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, 'T0k3nJWt', async (error, credentials) => {
    //credentials son los datos DESTOKENIZADOS del token
    try {
      let user = await User.findOne({ email: credentials.email });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "las credenciales ingresadas son inválidas",
      });
    }
  });
};
