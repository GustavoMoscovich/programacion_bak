export default function (req,res,next) {
    try {
        if (req.user.role===2)  {   // los usuarios con role = 2 son premium 
            next()
        } else {
            return res.status(403).json({
                status: 403,
                method: req.method,
                path: req.url,
                response: 'Usuario no autorizado ',
                message: 'Usuario no autorizado '
            })
        }
    } catch (error) {
        next(error)
    }
}