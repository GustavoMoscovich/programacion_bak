import { Router } from "express";
import CartsFunctions from "../functions/CartsFunctions.js"

const router = Router();

const cartManager = new CartsFunctions ('./files/carts.json');

// si se pasa el query ?limit=XX devuelve solo los XX carritos caso contrario se pasan todos los carritos
router.get('/', (req, res) => {  
    const {limit} = req.query
 
    const carts = cartManager.getCarts();
    if (Number(limit)>0) {
        res.send(carts.slice(0,limit))
    } else {res.send(carts)
    }
})


// busca carrito por ID. Si existe el ID buscado devuelve el objeto, caso contrario devuelve un objeto vacio
router.get('/:id', (req, res) => {  
    const cartId = Number(req.params.id) 
    const cart = cartManager.getCartsById(cartId);

    if (Object.keys(cart).length != 0) {
        res.send(cart)
    } else { res.send([])
    }
})

// agrega carrito nuevo
router.post('/', (req, res) => {
    const cart = req.body;

    const arrayCarts = cartManager.getCarts();

    cart.id =
    arrayCarts.length === 0
      ? 1
      : arrayCarts[arrayCarts.length - 1].id + 1;
      arrayCarts.push(cart); // Agrego al array
    cartManager.addToFile( JSON.stringify(arrayCarts, null, "\t"));
    res.send({status:'success', message:'carrito creado'});

})

// modifica carrito por ID
router.put('/:id', (req, res) => {
    const cart = req.body;
    const cartId = Number(req.params.id);
    const arrayCarts = cartManager.getCarts();

    const pInd = arrayCarts.findIndex((cart) => cart.id === cartId);

    if (pInd !== -1) {
        arrayCarts[pInd] = {id: arrayCarts[pInd].id, ...cart};
        cartManager.addToFile( JSON.stringify(arrayCarts, null, "\t"));
        res.send({status: 'success', message: 'carrito modificado'});
    }
})

// borra carrito por ID
router.delete('/:id', (req, res) => {
    const cartId = Number(req.params.id);
    const arrayCarts = cartManager.getCarts();

    const pInd = arrayCarts.findIndex((cart) => cart.id === cartId);

    if (pInd !== -1) {
        arrayCarts.splice(pInd,1);
        cartManager.addToFile( JSON.stringify(arrayCarts, null, "\t"));
        res.send({status: 'success', message: 'carrito eliminado'});
    } else {
        return res.status(400).send({status: 'error', error: 'id de producto no existe'})
    }
})


// agrega al carrito CID el producto PID -- Si PID existe en CID se agrega como nuevo con qty=1,
router.post('/:cid/product/:pid', (req, res) => {

    const cartId = Number(req.params.cid);
    const prodId = Number(req.params.pid);

    const arrayCarts = cartManager.getCarts();
    const cartIndex = arrayCarts.findIndex((cart) => cart.id === cartId);

    if (cartIndex!==-1) {

        const prodIndex= arrayCarts[cartIndex].products.findIndex((prod) => prod.id === prodId);
        if (prodIndex!==-1) { // el ID del producto existe en el carrito entonces se incrementa la cantidad
            arrayCarts[cartIndex].products[prodIndex].quantity = (arrayCarts[cartIndex].products[prodIndex].quantity+1)
            cartManager.addToFile( JSON.stringify(arrayCarts, null, "\t"));
            res.send({status:'success', message:'producto modificado en carrito'});
        } else { // el ID del producto NO existe en el carrito entonces se agrega como nuevo con cantidad=1
            arrayCarts[cartIndex].products.push({"id":prodId,"quantity":1});
            cartManager.addToFile( JSON.stringify(arrayCarts, null, "\t"));
            res.send({status:'success', message:'producto agregado en carrito'});
        }
    }

})

export default router;