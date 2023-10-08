import User from "../dao/mongo/models/userdb.js"

export default async function(req,res,next) {
    try {
        const { email, password } = req.body
        let one = await User.findOne({ email })
        if (one && one.password===password) {
            next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                response: 'Credenciales Ingresadas Inválidas',
                message: 'Credenciales Ingresadas Inválidas'
            })
        }
    } catch (error) {
        next(error)
    }
}