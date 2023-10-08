import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default (req,res,next)=>{
    let token = jwt.sign(
        { mail:req.body.email },
        config.SECRET_KEY,
        { expiresIn:60*60*24*7 }
    )
    req.session.token = token
    return next()
}