export default function (req,res,next) {
    try {
        if (req.session.role===1)  {   // los usuarios con role = 1 son administradores y solo ellos pueden crear productos
            next()
        } else {
            return res.status(403).json({
                status: 403,
                method: req.method,
                path: req.url,
                response: 'Usuario no autorizado para la creación de Productos',
                message: 'Usuario no autorizado para la creación de Productos'
            })
        }
    } catch (error) {
        next(error)
    }
}