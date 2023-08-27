export default function (req,res,next) {
    try {
        let { password } = req.body
        if (password.length>=8) {
            next()
        } else {
            return res.status(411).json({
                status: 411,
                method: req.method,
                path: req.url,
                response: 'Password debe tener al menos 8 caracteres',
                message: 'Password debe tener al menos 8 caracteres'
            })
        }
    } catch (error) {
        next(error)
    }
}