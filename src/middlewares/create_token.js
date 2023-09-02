import jwt from "jsonwebtoken";

export default (req,res,next)=>{
    let token = jwt.sign(
        { mail:req.body.email },
        'T0k3nJWt', // process.env.SECRET_KEY
        { expiresIn:60*60*24*7 }
    )
    req.session.token = token
    return next()
}