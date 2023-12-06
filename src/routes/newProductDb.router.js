import { Router } from "express";

const router = Router();

router.get('/' ,async (req, res) => {

    const userdata = {}
    userdata.role = (req.session.role===1 || req.session.role===2)? true : false
    console.log(req.session.role)
    console.log(userdata)
    res.render('newProduct', userdata)

})

export default router;
