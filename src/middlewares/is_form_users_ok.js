export default function (req,res,next) {
    try {
        let { name, email,password } = req.body
        if (name && email && password) {
            next()
        } else {
            return res.status(400).json({
                status: 400,
                method: req.method,
                path: req.url,
                response: 'Nombre , Mail y Password son datos obligatorios',
                message: 'Nombre , Mail y Password son datos obligatorios'
            })
        }
    } catch (error) {
        next(error)
    }
}