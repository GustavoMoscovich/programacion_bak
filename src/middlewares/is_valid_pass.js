import bcrypt from 'bcryptjs'
import User from '../dao/mongo/models/userdb.js'

export default async function (req,res,next) {
    //comparo las contraseñas
    //console.log('is_valid_pass req: ',req)
    let password_from_form = req.body.password
    let user = await User.findOne({ email:req.body.email })
    let password_hash = user.password
    //console.log({password_from_form,password_hash});
    let verified = bcrypt.compareSync(password_from_form,password_hash)
    //el booleano que resulte de la comparación
    //se utiliza para condicionar si dejo pasar o no
    if (verified) {
        return next()
    } else {
        return res.status(401).json({
            status: 401,
            method: req.method,
            path: req.url,
            response: 'Credenciales Ingresadas Inválidas'
        })
    }
}