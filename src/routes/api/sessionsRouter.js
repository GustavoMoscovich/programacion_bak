import { Router } from "express"
const sessions_router = Router()

sessions_router.get('/get',(req,res,next)=> {
    try {
        return res.status(200).json(req.session)
    } catch (error) {
        next(error)
    }
})

sessions_router.get('/counter',(req,res)=> {
    if (!req.session.counter) { req.session.counter = 1 }
    else { req.session.counter++ }
    return res.status(200).json({ message: `han ingresado ${req.session.counter} usuarios`})
})

sessions_router.post('/login',(req,res,next)=> {
    try {
        req.session.data = req.body
        return res.status(200).json({
            session: req.session,
            message: req.session.data.mail+' inició sesión'
        })
    } catch (error) {
        next(error)
    }
})

sessions_router.post('/signout',(req,res,next)=> {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: 'sesion cerrada',
            dataSession: req.session
        })
    } catch (error) {
        next(error)
    }
})

export default sessions_router