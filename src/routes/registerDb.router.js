import { Router } from "express";

const router = Router();

router.get('/' ,async (req, res) => {
    res.render('register')

})

export default router;
